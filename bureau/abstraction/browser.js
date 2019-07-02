const {Chain} = require("./chain.js"),
    {Wait} = require("./wait.js");

let {driver} = require("../browser_setup.js");


class Browser extends Chain {

    /**
     * @category UI Interactions
     * @constructs
     * @extends Chain
     * @classdesc For interacting with the browser window
     */
    constructor() {
        super();
    }

    /**
     *  @memberOf Browser
     *  @method quit
     *  @description Quits the current browser TODO: Implement a restart
     *  @example browser.quit;
     */
    static get quit() {
        return driver.quit();
    }

    /**
     *  @memberOf Browser
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