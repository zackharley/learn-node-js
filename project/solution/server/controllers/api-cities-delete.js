const fs = require('fs');
const path = require('path');

const db = path.resolve(__dirname, '../cities.json');

module.exports = function apiCitiesDelete(req, res) {
	const invalidIndex = -1;
	const numberOfCitiesToDelete = 1;
	const cityToDelete = req.body.city;

	fs.readFile(db, resolveRead);

	function resolveRead(err, cities) {
		if(err) {
			res.status(500).send(err);
		} else {
			deleteCity(JSON.parse(cities));
		}
	}

	function deleteCity(cities) {
		const index = findCityToDeleteIndex(cities, cityToDelete);

		if(index !== invalidIndex) {
			cities.splice(index, numberOfCitiesToDelete);
			fs.writeFile(db, JSON.stringify(cities), resolveWrite);
		} else {
			res.status(500).send('Cannot delete city that is not in database!');
		}
	}

	function findCityToDeleteIndex(cities, cityToDelete) {
		return cities.findIndex((element) => {
			return isInRange(element, cityToDelete);
		});
	}

	function resolveWrite(err) {
		if(err) {
			res.status(500).send(err);
		} else {
			res.send(`${cityToDelete} deleted successfully!`);
		}
	}
};

/**
 * [isInRange description]
 * @param  {[type]}  element [description]
 * @param  {[type]}  cityToDelete    [description]
 * @return {Boolean}         [description]
 */
function isInRange(element, cityToDelete) {
	return (
		element.lat - 0.01 === cityToDelete.lat  ||
		element.lat === cityToDelete.lat ||
		element.lat + 0.01 === cityToDelete.lat
	) && (
		element.lng - 0.01 === cityToDelete.lng  ||
		element.lng === cityToDelete.lng ||
		element.lng + 0.01 === cityToDelete.lng
	);
}
