const {driver} = require("../browser_setup.js"),
    {FindError, TestError} = require("./errors.js"),
    {Chain} = require("./chain.js"),
    {Wait} = require("./wait.js"),
    {until} = require("selenium-webdriver");


class Element extends Chain {
    /**
     * @category UI Interactions
     * @constructs
     * @extends Chain
     * @param {Object} locator The locator for the element. Can be anything accepted by selenium, in the format {<i>type<i>: <i>locator<i>}
     * @classdesc For interacting with the elements on the webpage
     * @example new Element({css: 'input[name="q"]'})
     */
    constructor(locator) {
        super();

        /**
         * @name locator
         * @memberOf Url
         * @description The locator for the element. Can be anything accepted by selenium, in the format {<i>type<i>: <i>locator<i>}
         * @returns Object
         * @example await element.get.locator
         */
        this.locator = locator;
    }

    /**
     * @name displayed
     * @memberOf Element
     * @description Asserts the elements visibility
     * @returns {Promise<*>}
     * @example await element.should.eventually.be.displayed
     *
     */
    get displayed() {
        if (this.switches.not) {
            return (async () => {
                this.switches.development = true;
                await Wait.for(until.elementIsNotVisible(await this.find()));
                return this.resetSwitches;
            })();
        } else {
            return (async () => {
                this.switches.development = true;
                await Wait.for(until.elementIsVisible(await this.find()));
                return this.resetSwitches;
            })();
        }
    }

    /**
     * @name find
     * @memberOf Element
     * @description Asserts that the element exists in the DOM
     * @returns {Promise<*>}
     * @example await element.find();
     *
     */
    async find() {
        if (this.switches.development) {
            return new Promise(async (resolve) => {
                let element = await driver.findElement(this.locator);
                resolve(element);
            }).catch((e) => {
                throw new FindError(e)
            }).then((result) => {
                return result;
            });
        } else if (this.switches.not) {
            return await (async () => {
                this.switches.development = true;
                return await this.find().catch((e) => {
                    if ((JSON.stringify(e).includes("NoSuchElementError") || JSON.stringify(e).includes("StaleElementReferenceError")) && this.switches.not) {
                        return true;
                    } else {
                        throw new FindError(e);
                    }
                }).then(() => {
                    return this.resetSwitches;
                });
            })();
        } else {
            return (async () => {
                return await Wait.for(until.elementLocated(this.locator)).then(() => {
                    return this;
                });

            })();
        }
    }

    /**
     * @name found
     * @memberOf Element
     * @description Asserts that the element exists in the DOM
     * @returns {Promise<*>}
     * @example await element.can.be.found
     *
     */
    get found() {
        return new Promise(async (resolve) => {
            let result = await this.find();
            resolve(result);
        }).catch((e) => {
            throw new FindError(e)
        }).then((result) => {
            return result;
        });
    }

    /**
     * @name location
     * @memberOf Element
     * @description Gets the co-ordinates of the element
     * @returns {Promise<*>}
     * @example let location = await element.get.location;
     *
     */
    get location() {
        return new Promise(async () => {
            this.switches.development = true;
            return new Promise(await this.find().catch((e) => {
                throw new FindError(e)
            }).then((result) => {
                return result;
            })).getRect().catch((e) => {
                throw new TestError(e);
            }).then((result) => {
                return {x: result.x, y: result.y};
            });

        })()
    }

    /**
     * @name click
     * @memberOf Element
     * @description Clicks on the element provided
     * @returns {Promise<*>}
     * @example await element.click;
     *
     */
    get click() {
        return this.find().catch((e) => {
            throw new FindError(e)
        }).then(async () => {
            this.switches.development = true;
            return await (await this.find().catch((e) => {
                throw new FindError(e)
            }).then((result) => {
                return result;
            })).click().then(() => {
                return this.resetSwitches;
            });
        })
        // await driver.actions({bridge: false}).move(this.location).click().perform(); // TODO: Will fix issue where elements are unclickable due to being covered by a transparent element, but won't work yet due to a bug: https://github.com/SeleniumHQ/selenium/issues/7191
    }

    /**
     * @name clicked
     * @memberOf Element
     * @description Clicks on the element provided
     * @returns {Promise<*>}
     * @example await element.can.be.clicked;
     *
     */
    get clicked() {
        return new Promise(async (resolve) => {
            let result = await this.click;
            return resolve(result);
        }).catch((e) => {
            throw new FindError(e);
        }).then((result) => {
            return result;
        });
    }

    /**
     * @name attribute
     * @memberOf Element
     * @description Gets the attribute given of the element
     * @param {string} attribute
     * @returns {Promise<*>}
     * @example let attribute = await element.get.attribute("id");
     *
     */
    async attribute(attribute) {
        return await this.find().then(async () => {
            this.switches.development = true;
            return await (await this.find().catch((e) => {
                throw new FindError(e)
            }).then((result) => {
                return result;
            })).getAttribute(attribute).then((result) => {
                return result;
            });
        });
    }

    /**
     * @name text
     * @memberOf Element
     * @description Gets the text of the element
     * @returns {Promise<*>}
     * @example let text = await element.get.text;
     *
     */
    get text() {
        this.switches.development = true;
        return (async () => {
            return (await this.find().catch((e) => {
                throw new FindError(e)
            }).then((result) => {
                return result;
            })).getText().then((result) => {
                return result;
            });
        })().catch((e) => {
            throw new FindError(e);
        }).then((result)=>{
            return result;
        });
    }
}


exports.Element = Element;