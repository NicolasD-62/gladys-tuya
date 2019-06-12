module.exports = function (sails) {
	const install = require('./lib/install');
	const setup = require('./lib/setup');
	const init = require('./lib/init');
	const exec = require('./lib/exec');

	gladys.on('ready', () => {
		init();
	});

	return {
		install: install,
		setup: setup,
		init: init,
		exec: exec
	};
};
