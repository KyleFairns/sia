const {driver} = require('../browser_setup.js'),
    {config} = require('../config_transformer.js'),
    {Chain} = require('./chain.js');

class Wait extends Chain {
    constructor(time) {
        super();
        this.time = time || 1;
    }

    get seconds() {
        return (async () => {
            return await new Promise(done => setTimeout(done, this.time * 1000))
                .then(() => {
                    return true;
                });
        })();
    }

    get second() {
        this.time = 1;
        return this.seconds;
    }

    static async for(until) {
        return await driver.wait(until, config.timeouts.step);
    }

    static async until(until) {
        return await Wait.for(until);
    }
}

exports.Wait = Wait;