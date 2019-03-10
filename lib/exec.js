const TuyaDevice = require('tuyapi');
const Promise = require('bluebird');
const find = require('lodash.find');
const config = require('../config');
const utils = require('./utils');

module.exports = function exec(params) {
	const id = params.deviceType.identifier;
	const deviceConfig = find(config.devices, ['id', id]);
	sails.log.debug(`Tuya - Device: ${JSON.stringify(deviceConfig)}`);

	if (!deviceConfig) {
		sails.log.error(`Tuya - Error, device unknown in config file!`);
		return Promise.reject();
	}

	try {
		const tuyaDevice = new TuyaDevice({ id: deviceConfig.id, key: deviceConfig.key });
		sails.log.debug(`Tuya - TuyaDevice: ${JSON.stringify(tuyaDevice)}`);

		return tuyaDevice.find()
			.then(() => {
				sails.log.debug(`Tuya - Device connecting!`);
				return tuyaDevice.connect();
			})
			.then(() => {
				sails.log.debug(`Tuya - Device connected: ${tuyaDevice.isConnected()}`);
				if (params.deviceType.type === 'binary') {
					const value = params.state.value;
					switch (params.deviceType.deviceTypeIdentifier) {
						case 'power':
							return utils.powerDevice(tuyaDevice, value);

						case 'open':
							return utils.openDevice(tuyaDevice, value);

						case 'close':
							return utils.closeDevice(tuyaDevice, value);

						default:
							return Promise.reject();
					}
				}

				return  Promise.reject();
			})
			.then(() => {
				sails.log.debug(`Tuya - Device disconnecting!`);
				return tuyaDevice.disconnect();
			})
			.catch((err) => {
				sails.log.error(`Tuya - Error, undefined device!`);
				tuyaDevice.disconnect();
				return Promise.reject(err);
			});
	} catch (err) {
		sails.log.error(`Tuya - Unknown error!`);
		Promise.reject(err);
	}
};
