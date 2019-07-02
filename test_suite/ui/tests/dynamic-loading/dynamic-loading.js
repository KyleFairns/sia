const {Browser} = require(`${process.cwd()}/bureau/abstraction/abstractions.js`),
    browser = new Browser(),
    {pom} = require(`${process.cwd()}/test_suite/ui/elements/pom.js`),
    {expect} = require('chai'),
    the = pom.pages.the,
    dynamic = pom.pages.the.internet.dynamic;


describe("Dynamic Loading", async () => {
    before(async () => {
        await browser.maximise;
        await the.internet.urls.home.navigate;
        await the.internet.menu.item("Dynamic Loading").can.be.clicked;
        await the.internet.menu.item("Example 2: Element rendered after the fact").can.be.clicked;
        return await dynamic.loading.start.can.be.clicked;
    });
    it("should be able to display text after loading", async () => {
        await dynamic.loading.bar.should.eventually.not.be.displayed.then(async () => {
            let text = await (await dynamic.loading.loaded.can.be.found).and.should.be.displayed.then(async (loaded) => {
                return await loaded.get.text;
            });
            expect(text).to.include("Hello World!");
        });

    });
});
