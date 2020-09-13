const ip = require('ip');

const getIp = () => ip.address();

const getPort = () => process.env.PORT || '3000';

const getProtocol = () => 'http';

const buildExternalUrl = () => {
  return `${getProtocol()}://${getIp()}:${getPort()}`;
};

module.exports = {
  getProtocol,
  getPort,
  getIp,
  buildExternalUrl,
};
