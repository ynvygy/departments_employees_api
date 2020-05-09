const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function() {
	mongoose.connect('mongodb://localhost/deapi')
	  .then(() => winston.info("Working"))
	  //.catch(err => console.error("could not connect", err))
}