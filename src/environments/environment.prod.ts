import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  envtype: 'production',
  ApiBaseUrl: 'http://59.144.96.161:2069/api/',
  AIBaseUrl: 'http://192.168.4.49:11434/api/'
};
