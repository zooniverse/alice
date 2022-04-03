const path = require('path')

function webpackFinal(config, options) {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, "../src")
  ];

  return config
}

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/preset-create-react-app'
  ],
  webpackFinal
}