const withImages = require('next-images');

module.exports = withImages({
  esModule: true,
  distDir: 'out',
  env: {
    POSTGRES_URI: process.env.POSTGRES_URI,
  },
});
