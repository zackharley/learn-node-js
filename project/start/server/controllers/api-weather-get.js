const fs = require('fs');
const path = require('path');
const request = require('request');
const async = require('async');

const db = path.resolve(__dirname, '../cities.json');

const key = process.env.API_KEY; // specified in `/start.sh`

module.exports = function apiWeatherGet(req, res) {
	// Get the weather from http://openweathermap.org/api
}

/**
 * Converts a weather id (specifying the type of weather)
 * into a filename for an SVG representing that type of
 * weather.
 * @param  {Integer} id - The integer representing the type
 * of weather that is occuring.
 * @return {String} - The filename of an SVG representing
 * the type of weather that is occuring.
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
