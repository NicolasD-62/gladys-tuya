const Promise = require('bluebird');
const config = require('../config');
const init = require('./init');
const type = require('./type');

module.exports = function setup() {
	return Promise.mapSeries(config.devices, (configDevice) => {
		let devices;
		try {
			devices = type.device[configDevice.type].devices;
		} catch (err) {
			sails.log.error(`Tuya - Error, device type ${configDevice.type} doesn't exist in config file!`);
			return Promise.reject(err);
		}

		return Promise.mapSeries(devices, (device) => {
			// sails.log.debug(`DEBUG - Setting device ID: ${device.id}...`);
			const newDeviceTypes = device.deviceTypes
				.map((deviceType) => type.deviceType[deviceType]);
			const newDevice = {
				device: {
					name: configDevice.name ? configDevice.name : device.name,
					identifier: configDevice.id + '_' + device.dps,
					protocol: 'wifi',
					service: 'tuya'
				},
				types: newDeviceTypes
			};
			// sails.log.debug(`DEBUG - Creating device: ${JSON.stringify(newDevice)}...`);
			return gladys.device.create(newDevice)
				.then((device) => {
					sails.log.info(`Tuya - Device: ${device.device.identifier} created!`);
					return Promise.resolve();
				})
				.catch((err) => {
					sails.log.error(`Tuya - Error, device: ${newDevice.device.identifier} not created!`);
					return Promise.reject(err);
				});
		});
	})
		.then(() => init());
};
