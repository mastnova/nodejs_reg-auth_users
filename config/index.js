const nconf = require('nconf');

nconf.argv()
	.env()
	.file({'file': __dirname + '/config.json'});
nconf.set('database:port', 5984);
	module.exports = nconf;
