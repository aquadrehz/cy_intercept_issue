const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
const fs = require("fs-extra");
const path = require("path");

function getConfigurationByFile(envConfig) {
  const ENV_CONFIG_FILE = path.resolve(
    "cypress",
    "configs",
    `${envConfig}`,
    `EnvConfig.json`
  );

  return fs.readJson(ENV_CONFIG_FILE);
}

module.exports = (on, config) => {
  const options = browserify.defaultOptions;

  options.browserifyOptions.plugin.unshift(["tsify"]);
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on("file:preprocessor", cucumber(options));

  // accept a configFile value or use development by default
  const ENV_CONFIG = config.env.ENV || "dev";
  return getConfigurationByFile(ENV_CONFIG);
};
