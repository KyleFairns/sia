const {Url} = require(`${process.cwd()}/bureau/abstraction/abstractions.js`);

let urls = {
    the: {
        internet: new Url("https://the-internet.herokuapp.com/")
    },
    api: {
        create:{
            user: new Url("http://dummy.restapiexample.com/api/v1/create")
        }
    }
};

exports.urls = urls;