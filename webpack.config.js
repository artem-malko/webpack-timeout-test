// webpack.config.js
const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },

  output: {
    crossOriginLoading: 'anonymous',
    chunkLoadTimeout: 5000,
  },

  mode: 'development',
};
