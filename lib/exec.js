const TuyaDevice = require('tuyapi');
const Promise = require('bluebird');
const config = require('../config.js');
const utils = require('./utils.js');

module.exports = function exec(params) {
	const id = params.deviceType.identifier;
	const device = new TuyaDevice({ id: id, key: config[id].key });
	
	return device.resolveId()
		.then(() => {
			//device.get({ schema: true }).then((data) => sails.log.debug(`Tuya - Device data: ${JSON.stringify(data)}`));

			if (params.deviceType.type === 'binary') {
				const value = params.state.value;
				switch (params.deviceType.deviceTypeIdentifier) {
					case 'power':
						return utils.powerDevice(device, value);

					case 'open':
						return utils.openDevice(device, value);

					case 'close':
						return utils.closeDevice(device, value);

					default:
						return Promise.reject();
				}
			}

			return  Promise.reject();
		})
		.catch((err) => Promise.reject(err));
};
