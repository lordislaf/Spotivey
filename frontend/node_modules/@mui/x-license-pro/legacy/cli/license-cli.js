/* eslint-disable no-console */
import * as yargs from 'yargs';
import { generateLicence } from '../generateLicense/generateLicense';
import { base64Decode } from '../encoding/base64';
var oneDayInMs = 1000 * 60 * 60 * 24;
export function licenseDecodeCli() {
  yargs.command({
    command: '$0',
    describe: 'Decode a license key',
    builder: function builder(command) {
      return command.option('key', {
        default: '',
        alias: 'k',
        describe: 'License key.',
        type: 'string'
      });
    },
    handler: function handler(argv) {
      if (!argv.key) {
        throw new Error('MUI: You forgot to pass a license key. $ > licensegen -k xxx');
      }

      console.log("Decoding license key \"".concat(argv.key, "\""));
      var license = base64Decode(argv.key.substr(32));
      console.log("Decoded license: \n".concat(license));
    }
  }).help().strict(true).version(false).parse();
}
export function licenseGenCli() {
  yargs.command({
    command: '$0',
    describe: 'Generates a license key',
    builder: function builder(command) {
      return command.option('order', {
        default: '',
        alias: 'o',
        describe: 'Order number id.',
        type: 'string'
      }).option('expiry', {
        default: '366',
        describe: 'Number of days from now until expiry date.',
        type: 'string'
      });
    },
    handler: function handler(argv) {
      if (!argv.order) {
        throw new Error('MUI: You forgot to pass an order number. $ > licensegen -o order_123.');
      }

      var licenseDetails = {
        expiryDate: new Date(new Date().getTime() + parseInt(argv.expiry, 10) * oneDayInMs),
        orderNumber: argv.order
      };
      console.log("Generating new license number for order ".concat(licenseDetails.orderNumber, " with expiry date ").concat(licenseDetails.expiryDate.toLocaleDateString()));
      var license = generateLicence(licenseDetails);
      console.log("New license: \n".concat(license));
    }
  }).help().strict(true).version(false).parse();
}