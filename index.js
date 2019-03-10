module.exports = function(sails) {
	const install = require('./lib/install.js');
	const setup = require('./lib/setup.js');
	// const init = require('./lib/init.js');
	const exec = require('./lib/exec.js');

	/*gladys.on('ready', function() {
		init();
	});*/

	return {
		install : install,
		setup: setup,
		exec : exec
	};

};