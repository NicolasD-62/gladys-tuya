![gladys version](https://badgen.net/badge/Gladys/%3E=%203.9/purple)
![license](https://badgen.net/github/license/NicolasD-62/gladys-tuya)
[![dependencies Status](https://badgen.net/david/dep/NicolasD-62/gladys-tuya)](https://david-dm.org/NicolasD-62/gladys-tuya)

# gladys-tuya
Gladys module to control your Tuya devices.

## Prerequisites

* Gladys version >= 3.9 
* Device(s) ID and key pairs (see below)

## Linking a Tuya Device

1. Add any devices you want to use with tuyapi to the Tuya Smart app.

2. Install the CLI tool : 
```shell
$ sudo npm i @tuyapi/cli -g
```

3. Install AnyProxy and run it : 
```shell
$ sudo npm i anyproxy -g
$ anyproxy-ca
```

4. Run 'tuya-cli list-app'. It will print out a QR code; scan it with your phone and install the root certificate. After installation, trust the installed root certificate.
```shell
$ tuya-cli list-app
```

5. Configure the proxy on your phone with the parameters provided in the console.

6. Open Tuya Smart app and refresh the list of devices by "pulling down". A list of ID and key pairs should appear in the console (xxxxxxxxxxxx is the MAC adress) : 
```javascript
Devices(s):
[ { id: '07607580xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx' },
  { id: '63701040xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx' } ]
```
It's recommended to untrust the root certificate after you're done for security purposes.
- For Android : 
  - Go to Settings > Security & Location > Encryption & credentials > Trusted credentials > User tab, and remove AnyProxy certificate.
- For iPhone : 
  - Go to Settings > General > About > Certificate Trust Settings. Under "Enable full trust for root certificates," turn off trust for the AnyProxy certificate.


7. Uninstall AnyProxy. Then remove AnyProxy hidden folder.
```shell
$ sudo npm un anyproxy -g
$ rm -Rf .anyproxy
```

8. Uninstall the CLI tool : 
```shell
$ sudo npm un @tuyapi/cli -g
```

9. Fill in the config file with the ID and key pairs : 
```javascript
  devices: [
    { id: '07607580xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', name: 'Volet 1', type: 'curtain' },
    { id: '63701040xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', name: 'Volet 2', type: 'curtain' },
    ...
  ],
```

## Installation

1. Install the module through Gladys modules pannel and reboot Gladys when it's done. 

## Usage

After installation is done, you can control power for each switch in the devices pannel. 
