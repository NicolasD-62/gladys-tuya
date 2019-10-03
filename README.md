![gladys version](https://badgen.net/badge/Gladys/%3E=%203.9/purple)
![license](https://badgen.net/github/license/NickDub/gladys-tuya)
[![dependencies Status](https://badgen.net/david/dep/NickDub/gladys-tuya)](https://david-dm.org/NickDub/gladys-tuya)

# gladys-tuya
Gladys module to control your Tuya (and compatible) devices (Alfawise, BlitzWolf, Hanks, Konyks, Neo, Teckin, Xenon, ...).

Know apps that work with these devices (alphabetical order):  
Android:  
* [AHome](https://play.google.com/store/apps/details?id=com.aneken.ourhome)
* [BlitzWolf](https://play.google.com/store/apps/details?id=com.blitzhome)
* [eFamilyCloud](https://play.google.com/store/apps/details?id=com.efamily.cloud) v1.0.7
* Geeni ?
* [Jinvoo Smart](https://play.google.com/store/apps/details?id=com.xenon.jinvoo) v1.0.3
  * uses phone number for account name/access
  * Works well with Alexa (Jinvoo Smart skill required)
* [Konyks](https://play.google.com/store/apps/details?id=com.konyks)
* [Smart Life](https://play.google.com/store/apps/details?id=com.tuya.smartlife)
* [Swift Smart Life](https://play.google.com/store/apps/details?id=com.swifthome.smartlife)
* [Tuya Smart](https://play.google.com/store/apps/details?id=com.tuya.smart)

iPhone:  
* [BlitzWolf](https://apps.apple.com/fr/app/blitzwolf/id1407211033)
* [Jinvoo Smart](https://itunes.apple.com/us/app/jinvoo-smart/id1182632835)
* [Konyks](https://itunes.apple.com/fr/app/konyks/id1366523085)
* [Smart Life - Smart Living](https://itunes.apple.com/us/app/smart-life-smart-living/id1115101477)
* [TuyaSmart](https://itunes.apple.com/us/app/tuyasmart/id1034649547)

Présentation de Tuya Smart sur le blog [Domotique Info](https://www.domotique-info.fr/2019/05/tuya-smart-votre-maison-connectee-sans-box-domotique/).

## Prerequisites

* Gladys version >= 3.9 
* Device(s) ID and key pairs (see below)

## Retrieving Tuya Device ID and LocalKey values

1. Add any devices you want to use with tuyapi to the Tuya Smart app.

1. Install the CLI tool:
    ```shell
    $ sudo npm i @tuyapi/cli -g
    ```

1. Install AnyProxy and run it:
    ```shell
    $ sudo npm i anyproxy -g
    $ anyproxy-ca
    ```

1. Run `tuya-cli list-app`. It will print out a QR code; scan it with your phone and install the root certificate. After installation, trust the installed root certificate.
    ```shell
    $ tuya-cli list-app
    ```

1. Configure the proxy on your phone with the parameters provided in the console.

1. Open Tuya Smart app and refresh the list of devices by "pulling down". A list of ID and key pairs should appear in the console (xxxxxxxxxxxx is the MAC adress):
    ```javascript
    Devices(s):
    [ { id: '07607580xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx' },
      { id: '63701040xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx' } ]
    ```
    It's recommended to untrust the root certificate after you're done for security purposes.
    - For Android:
      - Go to Settings > Security & Location > Encryption & credentials > Trusted credentials > User tab, and remove AnyProxy certificate.
    - For iPhone:
      - Go to Settings > General > About > Certificate Trust Settings. Under "Enable full trust for root certificates," turn off trust for the AnyProxy certificate.


1. Uninstall AnyProxy. Then remove AnyProxy hidden folder.
    ```shell
    $ sudo npm un anyproxy -g
    $ rm -Rf .anyproxy
    ```

1. Uninstall the CLI tool:
    ```shell
    $ sudo npm un @tuyapi/cli -g
    ```

1. Fill in the config file with the ID and key pairs:
    ```javascript
      devices: [
        { id: '07607580xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', version: 3.1, type: 'switch_1', name: 'Switch Salon' }, // Simple On/Off switch
        { id: '63701040xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', version: 3.1, type: 'curtain', name: 'Volet Chambre' }, // Volet roulant
        ...
      ],
    ```
    Available types :
  - WiFi curtain switch: `curtain`
  - WiFi plug: `plug`
  - WiFi surge protector 3+1: `surge_31`

## Installation

1. Install the module through Gladys modules panel and reboot Gladys when it's done. 

## Usage

After installation is done, you can control power for each switch in the devices panel. 
