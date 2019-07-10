const {User} = require("bureau-ium");

let users = {
    Joan: {
        Griffiths: new User({name: "Joan Griffiths", age: "34", salary: "58000"})
    }
};

exports.users = users;