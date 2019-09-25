module.exports = {
  /**
   * Tuya device list
   *  - id: device unique id
   *  - key: local secret key
   *  - type: device type (see id's values of devicesTypes)
   *  - name: device usual name (optional, if not set, default device name will be used)
   */
  devices: [
    { id: '63701040xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', version: 3.1, type: 'switch_1', name: 'Lampe salon' }, // Simple On/Off switch
    { id: '07607580xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', version: 3.1, type: 'curtain', name: 'Volet Chambre' }, // Volet roulant
    { id: '85502354xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', version: 3.1, type: 'surge_31', name: 'Multi-prise Salon' }, // Multi-prise
  ]
};
