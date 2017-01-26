const numberOne = parseInt(process.argv[2]);
const numberTwo = parseInt(process.argv[3]);

if(isNaN(numberOne) || isNaN(numberTwo)) {
	throw new Error('You must supply two integers!');
} else {
	const sum = numberOne + numberTwo;
	console.log(`${numberOne} + ${numberTwo} = ${sum}`);
}
