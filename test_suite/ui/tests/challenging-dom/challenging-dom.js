const {Browser} = require("bureau-ium"),
    browser = new Browser(),
    {pom} = require(`${process.cwd()}/test_suite/pom/pom.js`),
    {expect} = require('chai'),
    the = pom.pages.the,
    challenging = pom.pages.the.internet.challenging;

describe("Challenging DOM", async () => {
    before(async () => {
        await browser.maximise;
        await the.internet.urls.home.navigate;
        return await the.internet.menu.item("Challenging DOM").can.be.clicked;
    });

    it("should be able to change button id's when clicking the red button", async () => {
        let result = await challenging.dom.can.change.button.ids();
        return expect(result).to.be.true;
    });
});