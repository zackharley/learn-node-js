module.exports = function logger(req, res, next) {

	const ip = req.ip;

	const today = new Date();

	const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
	const month = generateMonthName(today.getMonth());
	const year = today.getFullYear();
	const date = `${day}/${month}/${year}`;

	const time = today.toLocaleTimeString();

	const datetime = `[${date}:${time}]`;

	const method = req.method;
	const url = req.originalUrl;

	console.log(`${ip} ${datetime} ${method} - ${url}`);

	next();
}

function generateMonthName(monthNumber) {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	return months[monthNumber];
}
