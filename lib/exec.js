const TuyaDevice = require('tuyapi');
const Promise = require('bluebird');
const find = require('lodash.find');
const config = require('../config');

module.exports = function exec(params) {
	const arrayIdentifier = params.deviceType.identifier.split('_');
	const id = arrayIdentifier[0];
	const dps = arrayIdentifier[1];
	const type = params.deviceType.type;
	const action = params.deviceType.deviceTypeIdentifier;
	const value = params.state.value;
	const deviceConfig = find(config.devices, ['id', id]);
	// sails.log.debug(`DEBUG - Device config: ${JSON.stringify(deviceConfig)}`);

	if (!deviceConfig) {
		sails.log.error(`Tuya - Error, device unknown in config file!`);
		return Promise.reject();
	}

	try {
		const tuyaDevice = new TuyaDevice({ id: deviceConfig.id, key: deviceConfig.key, version: deviceConfig.version });
		// sails.log.debug(`DEBUG - Tuya device: ${JSON.stringify(tuyaDevice)}`);

		return tuyaDevice.find()
			.then(() => tuyaDevice.connect())
			.then(() => {
				switch (type) {
					case 'binary':
						switch (action) {
							case 'power':
								sails.log.info(`Tuya - Power device: ${value}`);
								const state = value === 1 ? 'true' : 'false';
								sails.log.debug(`DEBUG - Change state dps: ${dps}, state: ${state}`);
								return tuyaDevice.set({ dps, set: state });

							case 'open':
								if (value === 1) {
									sails.log.info(`Tuya - Open device`);
									return tuyaDevice.set({ dps, set: '1' });
								} else {
									sails.log.info(`Tuya - Stop device`);
									return tuyaDevice.set({ dps, set: '3' });
								}

							case 'close':
								if (value === 1) {
									sails.log.info(`Tuya - Close device`);
									return tuyaDevice.set({ dps, set: '2' });
								} else {
									sails.log.info(`Tuya - Stop device`);
									return tuyaDevice.set({ dps, set: '3' });
								}

							default:
								return Promise.reject(`Tuya - Error, action does not exist!`);
						}

					// NOT YET USED BELOW
					case 'brightness': // (0-255)
					case 'hue': // (0-360)
					case 'saturation': // (0-255)
					default:
						sails.log.error(`Tuya - Error, action not allowed!`);
						return Promise.reject(`Tuya - Error, action not allowed!`);
				}
			})
			.then((status) => {
				tuyaDevice.disconnect();
				return Promise.resolve(value);
			})
			.catch((err) => {
				sails.log.error(`Tuya - Error: ${err}`);
				tuyaDevice.disconnect();
				return Promise.reject(err);
			});
	} catch (err) {
		sails.log.error(`Tuya - Unknown error!`);
		return Promise.reject(err);
	}
};
