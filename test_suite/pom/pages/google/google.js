const {Element} = require("bureau-ium");

let google = {
    urls: {
        home: require(`${process.cwd()}/test_suite/pom/urls.js`).urls.google.home
    },
    search: {
        box: new Element({css: "input[name='q']"}),
        result: new Element({css: "h3.LC20lb"}),
        for: async (text) => {
            return await (await this.google.search.box.can.be.filled.with(text)).and.sent.key("enter");
        }
    }
};

exports.google = google;