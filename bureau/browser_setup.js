const {Builder} = require('selenium-webdriver');
const {config} = require('./config_transformer.js');

let started = false,
    driver = startDriver();

// Integrate with BrowserStack for more browsers
function startDriver() {
    if (!started) {
        return new Builder().forBrowser(config.browser.name).build();
    } else {
        started = true;
        return driver;
    }
}


/**
 * @name driver
 * @description Uses the config to create a browser for the specifications asked for.
 * (this will only work when paired with something like BrowserStack - which involves running the scripts using virtual machines
 * that contain the browsers specified, and will run the Selenium code through it).
 * Could also add parallel functionality within the framework itself after doing a re-haul, whereby a parallel executor
 * will wrap tests (this may end up being a mocha only feature, but with more thought may work for cucumber)
 * @type Class
 */
exports.driver = driver;

