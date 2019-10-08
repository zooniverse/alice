const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve(__dirname, "../src")
  ];

  return config;
}
