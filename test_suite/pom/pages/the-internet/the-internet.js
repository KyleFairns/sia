const {Element} = require("bureau-ium");

let theInternet = {
    urls: {
        home: require(`${process.cwd()}/test_suite/pom/urls.js`).urls.the.internet
    },
    menu: {
        item: (text) => {
            return new Element({linkText: text});
        }
    },
    challenging: {
        dom: require("./challenging-dom.js").challenging.dom
    },
    dynamic:{
        loading: require("./dynamic-loading.js").dynamic.loading
    }
};

exports.theInternet = theInternet;