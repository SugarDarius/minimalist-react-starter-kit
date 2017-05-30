module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.NODE_PORT || 2727,

  webpackHost: 'localhost',
  webpackPort: process.env.NODE_PORT ? parseInt(process.env.NODE_PORT) + 1 : 2728,
};
