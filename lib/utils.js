module.exports = {
    /**
   * Tuya device types
   * - id : type id
   * - description : Tuya device description (see http://www.xenon.cn/diy/)
   * - deviceTypes : Glays deviceTypes description
   */
  devicesTypes: [
    { id: 'curtain', description: 'WiFi curtain switch', deviceTypes: [
      { name: 'Open', type: 'binary', category: '', identifier: 'open', sensor: false, min: 0, max: 1 }, 
      { name: 'Close', type: 'binary', category: '', identifier: 'close', sensor: false, min: 0, max: 1 }
    ] },
    /*{ id: 'plug', description: 'WiFi plug', deviceTypes: [
      { name: 'Plug', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
    ] },
    { id: 'switch_1', description: 'WiFi switch 1 gang', deviceTypes: [
      { name: 'Switch 1', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
    ] },
    { id: 'switch_2', description: 'WiFi switch 2 gang', deviceTypes: [
      { name: 'Switch 1', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 },
      { name: 'Switch 2', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
    ] },
    { id: 'switch_3', description: 'WiFi switch 3 gang', deviceTypes: [
      { name: 'Switch 1', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 },
      { name: 'Switch 2', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 },
      { name: 'Switch 3', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
    ] },
    { id: 'outlet', description: 'WiFi In Wall Outlet', deviceTypes: [
      { name: 'Plug', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
      { name: 'USB Plug 1', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
      { name: 'USB Plug 2', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
    ] },
    { id: 'surge_42', description: 'Wi-Fi surge protector 4+2', deviceTypes: [
      { name: 'Plug 1', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
      { name: 'Plug 2', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
      { name: 'Plug 3', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
      { name: 'Plug 4', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
      { name: 'USB Plug 1', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
      { name: 'USB Plug 2', type: 'binary', category: '', identifier: 'power', sensor: false, min: 0, max: 1 }
    ] },*/
  ]
};
