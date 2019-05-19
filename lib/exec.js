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
		const tuyaDevice = new TuyaDevice({ id: deviceConfig.id, key: deviceConfig.key });
		// sails.log.debug(`DEBUG - Tuya device: ${JSON.stringify(tuyaDevice)}`);

		return tuyaDevice.find()
			.then(() => tuyaDevice.connect())
			.then(() => {
				// sails.log.debug(`DEBUG - Tuya device connected: ${tuyaDevice.isConnected()}`);
				switch (type) {
					case 'binary':
						switch (action) {
							case 'power':
								sails.log.info(`Tuya - Power device: ${value}`);
								const state = value === 1 ? 'true' : 'false';
								return setState(tuyaDevice, dps, state)
									.then(() => Promise.resolve(value));

							case 'open':
								if (value === 1) {
									sails.log.info(`Tuya - Open device`);
									return setState(tuyaDevice, dps, '1')
										.then(() => Promise.resolve(value));
								} else {
									sails.log.info(`Tuya - Stop device`);
									return setState(tuyaDevice, dps, '3')
										.then(() => Promise.resolve(value));
								}

							case 'close':
								if (value === 1) {
									sails.log.info(`Tuya - Close device`);
									return setState(tuyaDevice, dps, '2')
										.then(() => Promise.resolve(value));
								} else {
									sails.log.info(`Tuya - Stop device`);
									return setState(tuyaDevice, dps, '3')
										.then(() => Promise.resolve(value));
								}

							default:
								return Promise.reject();
						}

					// NOT YET USED BELOW
					case 'brightness': // (0-255)
					case 'hue': // (0-360)
					case 'saturation': // (0-255)
					default:
						sails.log.error(`Tuya - Error, action not allowed!`);
						return Promise.reject();
				}
			})
			.then(() => tuyaDevice.disconnect())
			.catch((err) => {
				sails.log.error(`Tuya - Error, undefined device!`);
				tuyaDevice.disconnect();
				return Promise.reject(err);
			});
	} catch (err) {
		sails.log.error(`Tuya - Unknown error!`);
		return Promise.reject(err);
	}
};

function setState(device, dps, state) {
	return device.set({ dps, set: state })
		.then((result) => {
			// sails.log.debug(`DEBUG - Change state result: ${result}!`);
			return Promise.resolve();
		})
		.catch((err) => Promise.reject(err));
}
