const config = require('config')

module.exports = function() {
	if (!config.get('jwtPrivateKey')){
		throw new Error("Fatal error: jwt not defined")
		//console.log("FATAL ERROR: JTW is not defined");
		//process.exit(1);
	}
}