'use strict';

const expoPreset = require('jest-expo/jest-preset');

module.exports = {
  ...expoPreset,
  setupFiles: [
    require.resolve('./jest.polyfills.js'),
    ...expoPreset.setupFiles,
    require.resolve('./jest.setup.js'),
  ],
};
