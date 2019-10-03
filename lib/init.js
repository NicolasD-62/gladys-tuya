const TuyaDevice = require('tuyapi');
const Promise = require('bluebird');
const find = require('lodash.find');
const config = require('../config');

module.exports = function init() {
  gladys.device.getByService({ service: 'tuya' })
    .then((devices) => devices.map((device) => {
      const arrayIdentifier = device.identifier.split('_');
      const id = arrayIdentifier[0];
      const dps = arrayIdentifier[1];
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
          .then((found) => {
            // sails.log.debug(`DEBUG - Found: ${JSON.stringify(found)}`);
            return tuyaDevice.connect();
          })
          .then((connected) => {
            // sails.log.debug(`DEBUG - Tuya device connected: ${connected} - ${tuyaDevice.isConnected()}`);
            return tuyaDevice.get({ dps: dps });
          })
          .then((status) => {
            // sails.log.debug(`DEBUG - Status of ${device.identifier}: ${status}`);

            return gladys.deviceType.getByDevice({ id: device.id })
              .then((deviceTypes) => {
                // sails.log.debug(`DEBUG - Tuya deviceTypes: ${JSON.stringify(deviceTypes)}`);
                tuyaDevice.disconnect();

                return Promise.mapSeries(deviceTypes, (deviceType) => {
                  let values;
                  switch (deviceConfig.type) {
                    case 'curtain':
                      values = {
                        '1': { open: 1, close: 0 },
                        '2': { open: 0, close: 1 },
                        '3': { open: 0, close: 0 },
                      };
                      break;

                    case 'plug':
                    case 'surge_31':
                      values = {
                        'true': { power: 1 },
                        'false': { power: 0 },
                      };
                      break;

                    // NOT YET USED BELOW
                    case 'switch_1':
                    case 'switch_2':
                    case 'switch_3':
                    case 'outlet':
                    case 'surge_42':
                    default:
                      return Promise.reject();
                  }
                  return changeState(deviceType, values[status]);
                });
              });
          })
          .then(() => {
            sails.log.info(`Tuya - Device ID: ${device.identifier} initialized!`);
            return Promise.resolve();
          })
          .catch((err) => {
            sails.log.error(`Tuya - Error, undefined device!`);
            tuyaDevice.disconnect();
            return Promise.reject(err);
          });
      } catch (err) {
        sails.log.error(`Tuya - Unknown error!`);
        return Promise.reject(err);
      }
    }));
};

function changeState(deviceType, values) {
  return new Promise((resolve, reject) => {
    const newState = { devicetype: deviceType.id, value: values[deviceType.identifier] };
    // sails.log.debug(`DEBUG - Sending state ${JSON.stringify(newState)} to ${deviceType.identifier}...`);

    return gladys.deviceState.create(newState)
      .then((state) => {
        // sails.log.debug(`DEBUG - State ${deviceType.identifier} created`);
        return resolve();
      })
      .catch((err) => {
        sails.log.error(`Tuya - Error, state ${deviceType.identifier} not created!`);
        return reject(err);
      });
  });
}
