const {Element} = require(`${process.cwd()}/bureau/abstraction/abstractions.js`);
const {expect} = require("chai");

let challenging = {
    dom: {
        buttons: {
            blue: new Element({css: "a.button:not(.alert):not(.success)"}),
            red: new Element({css: "a.alert"}),
            green: new Element({css: "a.success"}),
            button: {
                with: {
                    id: (id) => {
                        return new Element({id: id});
                    }
                }
            }
        },
        can: {
            change: {
                button: {
                    ids: async () => {
                        let buttons = ["blue", "red", "green"],
                            buttonIds = [],
                            newButtonIds = [];

                        return await (async () => {
                            await buttons.forEach(async (colour) => {
                                // Get the Id's
                                await this.challenging.dom.buttons[colour].get.attribute("id").then((id) => {
                                    return buttonIds.push(id);
                                });
                            });
                        })().then(async () => {

                            // Generate new Id's
                            return await this.challenging.dom.buttons.red.click.then(async () => {

                                await buttons.forEach(async (colour) => {
                                    // Get the new Id's
                                    await this.challenging.dom.buttons[colour].get.attribute("id").then(async (id) => {
                                        return newButtonIds.push(id);
                                    })
                                });

                                // Loop through both sets of buttons (collected in same order);
                                for (let i = 0; i < buttonIds.length; i++) {
                                    expect(buttonIds[i]).to.not.equal(newButtonIds[i]); // Assertion that the values have changed
                                    if (i === (buttonIds.length - 1)) {
                                        return true;
                                    }
                                }
                            }).then((result) => {
                                return result;
                            });
                        })
                    }

                }

            }
        }
    }
};

exports.challenging = challenging;