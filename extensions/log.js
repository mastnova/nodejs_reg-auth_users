const winston = require('winston');

winston.addColors({info: 'blue'});

const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({colorize: true}),
		new (winston.transports.File)({filename: __dirname + '/../server.log'})
	]
});



module.exports = logger;


