const fs = require('fs');
const path = require('path');
const async = require('async');

const db = path.resolve(__dirname, '../cities.json');

module.exports = function apiCitiesPost(req, res) {
	const cityToAdd = req.body.city;

	fs.readFile(db, resolveRead);

	function resolveRead(err, cities) {
		if(err) {
			res.status(500).send(err);
		} else {
			addCityToDB(JSON.parse(cities));
		}
	}

	function addCityToDB(cities) {
		cities.push(cityToAdd);

		fs.writeFile(db, JSON.stringify(cities), resolveWrite);
	}

	function resolveWrite(err) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(`${cityToAdd} added successfully!`);
		}
	}

};
