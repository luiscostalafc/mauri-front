const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  distDir: 'out',
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
});
