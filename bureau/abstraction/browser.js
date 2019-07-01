const {Chain} = require("./chain.js"),
    {Wait} = require("./wait.js");

let {driver} = require("../browser_setup.js");

/**
 * @class Browser
 * @category Browser
 * @extends Chain
 * @description For interacting with the browser window
 * @example new Browser();
 */
class Browser extends Chain {
    constructor() {
        super();
    }

    /**
     *  @methodOf Browser
     *  @method quit
     *  @description Quits the current browser TODO: Implement a restart
     *  @example browser.quit;
     */
    static get quit() {
        return driver.quit();
    }

    /**
     *  @methodOf Browser
     *  @method maximise
     *  @description Makes the browser full-screen
     *  @example browser.maximise;
     */
    get maximise() {
        return new Wait().a.second.then(async () => {
            return await driver.manage().window().maximize();
        })
    }
}

exports.Browser = Browser;