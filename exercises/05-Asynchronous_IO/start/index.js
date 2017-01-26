const fs = require('fs');

const filename = process.argv[2];
const colourToCount = process.argv[3];

if(filename !== '' || colourToFind !== '') {
	let count = 0;
	const regexp = new RegExp(colourToCount, 'i');

	// Perform counting here

	console.log('Exiting');

} else {
	throw new Error('You must supply a filename and a colour to count!')
}
