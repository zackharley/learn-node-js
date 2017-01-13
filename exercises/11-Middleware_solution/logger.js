module.exports = function logger(req, res, next) {

	const ip = req.ip;
	const today = new Date();
	const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
	const month = generateMonthName(today.getMonth());
	const year = today.getFullYear();
	const date = `${day}/${month}/${year}`;
	const time = today.toLocaleTimeString();
	const datetime = `[${date}:${time}]`
	const method = req.method;
	const url = req.originalUrl;

	console.log(`${ip} ${datetime} ${method} - ${url}`);

	next();
}

function generateMonthName(monthNumber) {
	const months = [];
	months[0] = "Jan";
	months[1] = "Feb";
	months[2] = "Mar";
	months[3] = "Apr";
	months[4] = "May";
	months[5] = "Jun";
	months[6] = "Jul";
	months[7] = "Aug";
	months[8] = "Sep";
	months[9] = "Oct";
	months[10] = "Nov";
	months[11] = "Dec";
	return months[monthNumber];
}
