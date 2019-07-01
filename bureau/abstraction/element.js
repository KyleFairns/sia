const {driver} = require("../browser_setup.js"),
    {FindError, TestError} = require("./errors.js"),
    {Chain} = require("./chain.js"),
    {Wait} = require("./wait.js"),
    {until} = require("selenium-webdriver");

class Element extends Chain {
    constructor(locator) {
        super();
        this.locator = locator;
    }

    /**
     * @name displayed
     * @memberOf Element
     * @description Asserts the elements visibility
     * @returns {Promise<*>}
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
        // await driver.actions({bridge: false}).move(this.location).click().perform(); // Will fix issue where elements are unclickable due to being covered by a transparent element, but won't work yet: https://github.com/SeleniumHQ/selenium/issues/7191
    }

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

    async attribute(attr) {
        return await this.find().then(async () => {
            this.switches.development = true;
            return await (await this.find().catch((e) => {
                throw new FindError(e)
            }).then((result) => {
                return result;
            })).getAttribute(attr).then((result) => {
                return result;
            });
        });
    }

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