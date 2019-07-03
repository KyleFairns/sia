const {driver} = require('../browser_setup.js'),
    {config} = require('../config_transformer.js'),
    {Chain} = require('./chain.js');

class Wait extends Chain {

    /**
     * @category UI Interactions
     * @constructs
     * @extends Chain
     * @param {Number} time The amount of time that you want to wait
     * @classdesc For any waiting needed
     * @example new Wait(0.5).seconds
     */
    constructor(time = 1) {
        super();
        this.time = time || 1;
    }

    /**
     * @name seconds
     * @memberOf Wait
     * @description Waits the given amount of time
     * @returns {Promise<*>}
     * @example await new Wait(5).seconds
     *
     */
    get seconds() {
        return (async () => {
            return await new Promise(done => setTimeout(done, this.time * 1000))
                .then(() => {
                    return true;
                });
        })();
    }

    /**
     * @name second
     * @memberOf Wait
     * @description Waits for one second
     * @returns {Promise<*>}
     * @example await new Wait().a.second
     *
     */
    get second() {
        this.time = 1;
        return this.seconds;
    }

    /**
     * @name second
     * @memberOf Wait
     * @description Waits for the given statement to resolve to true
     * @returns {Promise<*>}
     * @example let element = (element.switches.development = true); await Wait.for(until.elementIsVisible(await element.found));
     *
     *
     */
    static async for(until) {
        return await driver.wait(until, config.timeouts.step);
    }

    /**
     * @name until
     * @memberOf Wait
     * @description Waits for the given statement to resolve to true
     * @returns {Promise<*>}
     * @example let element = (element.switches.development = true); await Wait.until(until.elementIsVisible(await element.found));
     */
    static async until(until) {
        return await Wait.for(until);
    }
}

exports.Wait = Wait;