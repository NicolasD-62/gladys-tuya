const lodash = require('lodash');
const Promise = require('bluebird');
const config = require('../config');
const utils = require('./utils');

module.exports = function setup() {
	return Promise.mapSeries(config.devices, (device) => {
		const newTypes = lodash.filter(utils.devicesTypes, (type) => type.id === device.type)[0];
		const newDevice = {
			device: {
				name: device.name,
				identifier: device.id,
				protocol: 'wifi',
				service: 'tuya'
			},
			types: newTypes.deviceTypes
		};

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
};