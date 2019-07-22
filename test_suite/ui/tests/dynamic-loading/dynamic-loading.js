const {Browser, Wait} = require("bureau-ium"),
    browser = new Browser(),
    wait = new Wait(),
    {pom} = require(`${process.cwd()}/test_suite/pom/pom.js`),
    {expect} = require('chai'),
    the = pom.pages.the,
    dynamic = pom.pages.the.internet.dynamic;


describe("Dynamic Loading", async () => {

    before(async () => {
        await (await browser.maximise).and.browse(the.internet.urls.home);
        await the.internet.menu.item("Dynamic Loading").can.be.clicked;
        await the.internet.menu.item("Example 2: Element rendered after the fact").can.be.clicked;
        await dynamic.loading.start.can.be.clicked;
    });

    it("should be able to display text after loading", async () => {
        await dynamic.loading.bar.should.not.be.displayed.then(async () => {
            await dynamic.loading.loaded.should.be.displayed.then(async () => {
                let text = await dynamic.loading.loaded.get.text;
                expect(text).to.include("Hello World!");
            });
        })
    });

});

