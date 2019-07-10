const {Browser} = require("bureau-ium"),
    browser = new Browser(),
    {pom} = require(`${process.cwd()}/test_suite/pom/pom.js`),
    google = pom.pages.google;

describe("Google", async () => {

    before(async () => {
        await browser.maximise;
        return await google.urls.home.navigate;
    });

    it("should be able to display results after searching", async () => {
        await google.search.for("Hello, World!");
        return await google.search.result.should.eventually.be.displayed.then(() => {
            return true;
        });
    });

});