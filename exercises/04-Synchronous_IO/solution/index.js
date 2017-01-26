const fs = require('fs');

const filename = process.argv[2];
const colourToCount = process.argv[3];

if(filename !== '' || colourToFind !== '') {
	let count = 0;
	const regexp = new RegExp(colourToCount, 'i');

	const colours = JSON.parse(fs.readFileSync(filename));

	colours.forEach(colour => {
		if(colour.match(regexp)) {
			count++;
		}
	});

	if(count === 0) {
		console.log(`Unable to find "${colourToCount}" in ${filename}`);
	} else {
		console.log(`There are ${count} occurences of ${colourToCount} in ${filename}`);
	}

	console.log('Exiting');

} else {
	throw new Error('You must supply a filename and a colour to count!')
}
