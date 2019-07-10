const {Url} = require("bureau-ium");

let urls = {
    the: {
        internet: new Url("https://the-internet.herokuapp.com/")
    },
    api: {
        create:{
            user: new Url("http://dummy.restapiexample.com/api/v1/create")
        }
    },
    google:{
        home: new Url("https://www.google.co.uk")
    }
};

exports.urls = urls;