const fs = require('fs');
const path = require('path');
const request = require('request');
const async = require('async');

const db = path.resolve(__dirname, '../cities.json');

const key = process.env.API_KEY;

module.exports = function apiWeatherGet(req, res) {
	const weather = [];

	fs.readFile(db, resolveRead);

	function resolveRead(err, cities) {
		if(err) {
			res.status(500).send(err);
		} else  {
			sendWeatherData(JSON.parse(cities));
		}
	}

	function sendWeatherData(cities) {

		async.every(cities, requestWeatherData, resolveWeatherData);
	}

	function requestWeatherData(city, callback) {
		const url = `http://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&APPID=${key}&units=metric`;

		request(url, (error, response) => {
			if(error) {
				callback(error);
			} else {
				weather.push(JSON.parse(response.body));
				callback(null, response);
			}
		});
	}

	function resolveWeatherData(error, result) {
		if(!error & result) {
			res.send(organizeWeatherData());
		} else {
			res.status(500).send(error);
		}
	}

	function organizeWeatherData() {
		return weather.map((city) => {

			const name = city.name;
			const {country} = city.sys;
			let {description} = city.weather[0];
			description = description.charAt(0).toUpperCase() + description.slice(1);
			const {id} = city.weather[0];
			const icons = resolveIcons(id);
			const currentTemp = parseInt(city.main.temp);
			const minTemp = parseInt(city.main.temp_min);
			const maxTemp = parseInt(city.main.temp_max);
			const position = {
				lat: city.coord.lat,
				lng: city.coord.lon
			}

			return {
				name,
				country,
				description,
				icons,
				currentTemp,
				minTemp,
				maxTemp,
				position
			};

		})
	}
}

/**
 * [resolveIcons description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
function resolveIcons(id) {
	if(id >= 200 && id < 300) {
		return ['Cloud-Lightning-Sun.svg', 'Cloud-Lightning-Moon.svg'];
	} else if((id >= 300 && id < 400) || (id >= 520 && id < 600)) {
		return ['Cloud-Rain.svg', 'Cloud-Rain.svg'];
	} else if(id >= 500 && id < 510) {
		return ['Cloud-Rain-Sun.svg', 'Cloud-Rain-Moon.svg'];
	} else if(id === 511 || (id >= 600 && id < 700)) {
		return ['Cloud-Snow-Sun.svg', 'Cloud-Snow-Moon.svg'];
	} else if(id >= 700 && id < 800) {
		return ['Cloud-Fog-Sun.svg', 'Cloud-Fog-Moon.svg'];
	} else if(id === 801) {
		return ['Cloud-Sun.svg', 'Cloud-Moon.svg'];
	} else if(id >= 802 && id < 900) {
		return ['Cloud.svg', 'Cloud.svg'];
	} else {
		return ['Sun.svg', 'Moon.svg'];
	}
}
