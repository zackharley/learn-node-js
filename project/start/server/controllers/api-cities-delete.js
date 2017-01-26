const fs = require('fs');
const path = require('path');

const db = path.resolve(__dirname, '../cities.json');

module.exports = function apiCitiesDelete(req, res) {
	// Delete cities here
};

/**
 * This function checks to see if both the latitude and longitude
 * of a city are within 0.01 degrees of the entry in the database.
 *
 * @param  {Object}  cityInDB - A city enty in the DB, containing
 * a lat and a lng
 * @param  {Object}  cityToDelete - A city that we want to delete
 * from the DB, containing a lat and a lng
 * @return {Boolean} - Returns true if the city in the db and the
 * city we want to delete are the same city, as verified by the
 * lat and lng
 */
function isInRange(cityInDB, cityToDelete) {
	return (
		cityInDB.lat - 0.01 === cityToDelete.lat  ||
		cityInDB.lat === cityToDelete.lat ||
		cityInDB.lat + 0.01 === cityToDelete.lat
	) && (
		cityInDB.lng - 0.01 === cityToDelete.lng  ||
		cityInDB.lng === cityToDelete.lng ||
		cityInDB.lng + 0.01 === cityToDelete.lng
	);
}
