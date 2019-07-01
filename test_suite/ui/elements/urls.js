const {Url} = require(`${process.cwd()}/bureau/abstraction/abstractions.js`);

let urls = {
    the: {
        internet: new Url("https://the-internet.herokuapp.com/")
    },
};

exports.urls = urls;