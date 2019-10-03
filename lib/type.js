module.exports = {
  /**
   * Tuya devices
   * - description: Tuya device description (see https://intl.tuya.com/ or http://www.xenon.cn/diy/)
   * - devices: Gladys devices
   * - devices.name: Name of the device
   * - devices.dps:  Device dps used to send and receive data
   * - devices.deviceTypes: DeviceTypes of the device
   */
  device: {
    curtain: {
      description: 'WiFi curtain switch', devices: [
        { name: 'WiFi curtain switch', dps: 1, deviceTypes: ['open', 'close'] },
      ]
    },
    plug: {
      description: 'WiFi plug', devices: [
        { name: 'WiFi plug', dps: 1, deviceTypes: ['plug'] },
      ]
    },
    surge_31: { description: 'WiFi surge protector 3+1', devices: [
      { name: 'WiFi plug 1', dps: 1, deviceTypes: ['plug'] },
      { name: 'WiFi plug 2', dps: 2, deviceTypes: ['plug'] },
      { name: 'WiFi plug 3', dps: 3, deviceTypes: ['plug'] },
      { name: 'WiFi USB plug(s)', dps: 7, deviceTypes: ['plug'] },
    ] },
    /*
    DEVICES BELOW NOT YET TESTED
    switch_1: { description: 'WiFi switch 1 gang', devices: [
      { name: 'WiFi switch', dps: 1, deviceTypes: ['switch'] },
    ] },
    switch_2: { description: 'WiFi switch 2 gang', devices: [
      { name: 'WiFi switch 1', dps: 1, deviceTypes: ['switch'] },
      { name: 'WiFi switch 2', dps: 2, deviceTypes: ['switch'] },
    ] },
    switch_3: { description: 'WiFi switch 3 gang', devices: [
      { name: 'WiFi switch 1', dps: 1, deviceTypes: ['switch'] },
      { name: 'WiFi switch 2', dps: 2, deviceTypes: ['switch'] },
      { name: 'WiFi switch 3', dps: 3, deviceTypes: ['switch'] },
    ] },
    outlet: { description: 'WiFi in wall outlet', devices: [
      { name: 'WiFi plug', dps: 1, deviceTypes: ['plug'] },
      { name: 'WiFi USB plug(s) 1', dps: 2, deviceTypes: ['plug'] },
      { name: 'WiFi USB plug(s) 2', dps: 3, deviceTypes: ['plug'] },
    ] },
    surge_42: { description: 'WiFi surge protector 4+2', devices: [
      { name: 'WiFi plug 1', dps: 1, deviceTypes: ['plug'] },
      { name: 'WiFi plug 2', dps: 2, deviceTypes: ['plug'] },
      { name: 'WiFi plug 3', dps: 3, deviceTypes: ['plug'] },
      { name: 'WiFi plug 4', dps: 4, deviceTypes: ['plug'] },
      { name: 'WiFi USB plug(s) 1', dps: 7, deviceTypes: ['plug'] },
      { name: 'WiFi USB plug(s) 2', dps: 8, deviceTypes: ['plug'] },
    ] },
    */
  },

  /**
   * Tuya deviceTypes
   * - name: Name of the deviceType
   * - type: Type of the deviceType
   * - category: Category of the deviceType (empty by default)
   * - identifier: Identifier of the deviceType (used by Gladys)
   * - sensor: Is the deviceType a sensor?
   * - min: Min value of the deviceType
   * - max: Max value of the deviceType
   */
  deviceType: {
    open: { name: 'Open', type: 'binary', category: '', identifier: 'open', sensor: false, min: 0, max: 1 },
    close: { name: 'Close', type: 'binary', category: '', identifier: 'close', sensor: false, min: 0, max: 1 },
    plug: { name: 'Plug', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 },
    switch: { name: 'Switch', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 },
  }
};
