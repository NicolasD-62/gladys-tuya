const TuyaDevice = require('tuyapi');
const Promise = require('bluebird');
const find = require('lodash.find');
const config = require('../config');

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
		sails.log.debug(`Tuya - device: ${JSON.stringify(tuyaDevice)}`);

		return tuyaDevice.find()
			.then(() => tuyaDevice.connect())
			.then(() => {
				sails.log.debug(`Tuya - Device connected: ${tuyaDevice.isConnected()}`);
				if (params.deviceType.type === 'binary') {
					const value = params.state.value;
					switch (params.deviceType.deviceTypeIdentifier) {
						case 'power':
							sails.log.debug(`Tuya - Power device: ${value}`);
							const state = value === 1 ? 'true' : 'false';

							return setState(tuyaDevice, state)
								.then(() => Promise.resolve(value));

						case 'open':
							if (value === 0) {
								sails.log.debug(`Tuya - Stop device`);
								return setState(tuyaDevice, '3')
									.then(() => Promise.resolve(value));
							} else {
								sails.log.debug(`Tuya - Open device`);
								return setState(tuyaDevice, '1')
									.then(() => Promise.resolve(value));
							}

						case 'close':
							if (value === 0) {
								sails.log.debug(`Tuya - Stop device`);
								return setState(tuyaDevice, '3')
									.then(() => Promise.resolve(value));
							} else {
								sails.log.debug(`Tuya - Close device`);
								return setState(tuyaDevice, '2')
									.then(() => Promise.resolve(value));
							}

						default:
							return Promise.reject();
					}
				}

				return Promise.reject();
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

function setState(device, state) {
	return device.set({ set: state })
		.then((result) => {
			sails.log.debug(`Tuya - Change state result: ${result}!`);
			return Promise.resolve();
		})
		.catch((err) => Promise.reject(err));
}
