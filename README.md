![gladys version](https://badgen.net/badge/Gladys/%3E=%203.9/purple)
![license](https://badgen.net/github/license/NickDub/gladys-tuya)
[![dependencies Status](https://badgen.net/david/dep/NickDub/gladys-tuya)](https://david-dm.org/NickDub/gladys-tuya)

# gladys-tuya
Gladys module to control your Tuya (and compatible) devices (Alfawise, Hanks, Konyks, Neo, Teckin, Xenon, ...).

Know apps that work with these devices (alphabetical order):  
Android:  
* [AHome](https://play.google.com/store/apps/details?id=com.aneken.ourhome)
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

1. Run 'tuya-cli list-app'. It will print out a QR code; scan it with your phone and install the root certificate. After installation, trust the installed root certificate.
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
        { id: '07607580xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', type: 'switch_1', name: 'Switch Salon' }, // Simple On/Off switch
        { id: '63701040xxxxxxxxxxxx', key: 'xxxxxxxxxxxxxxxx', type: 'curtain', name: 'Volet Chambre' }, // Volet roulant
        ...
      ],
    ```

## Alternative way

1. Install the [Tuya Smart Life](https://play.google.com/store/apps/details?id=com.tuya.smartlife) App onto your Android device.

1. Install ADB on your computer: https://www.xda-developers.com/install-adb-windows-macos-linux/

1. Ensure your device has USB debugging enabled.

1. Plug device into your computer.

1. Run filtered ADB logcat via shell:
   ```powershell
   > adb shell
   > logcat | grep BindDeviceSuccessPresenter
   ```

1. Add the smart plug in the Tuya App, monitor the adb logcat output for the following.

1. Find the "localKey" and "devId" keys listed in the output, ex:
   ```
   12-06 23:58:53.544 17782 17782 D Tuya    : BindDeviceSuccessPresenter updateList devIds:[{"ability":0,"attribute":0,"bv":"5.06","cloudOnline":true,"devId":"0120015260091453a970","encrypt":false,"gwType":"s","i18nTime":0,"iconUrl":"https://images.tuyaus.com/smart/icon/1496461963_0.jpeg","isLocalOnline":false,"isOnline":true,"lat":"","localKey":"5f5f784cd82d449b","lon":"","name":"WiFi Plug ","pv":"2.1","rnFind":false,"runtimeEnv":"prod","supportGroup":false,"switchDp":0,"time":1512626328,"uuid":"0120015260091453a970","verSw":"1.0.4"}]
   ```
   In this example, the LocalKey is `5f5f784cd82d449b` and the Id is `0120015260091453a970`.

## Installation

1. Install the module through Gladys modules panel and reboot Gladys when it's done. 

## Usage

After installation is done, you can control power for each switch in the devices panel. 
