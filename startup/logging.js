require('express-async-errors');
const winston = require('winston');
require('winston-mongodb')

module.exports = function() {
	//winston.handleExceptions(new winston.transports.File( { filename: 'uncaughtException.log'}))
	//new winston.transports.Console({ colorize: true, prettyPrint: true})
	process.on('uncaughtException', (ex) => {
		winston.error(ex.message, ex);
		process.exit(1)
	});

	process.on('uncaughtRejection', (ex) => {
		winston.error(ex.message, ex);
		process.exit(1)
	})

	winston.add(winston.transports.File, { filename: 'logfile.log' })
	winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/fga' })
}