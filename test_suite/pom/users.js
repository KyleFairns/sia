const {User} = require(`${process.cwd()}/bureau/abstraction/abstractions.js`);

let users = {
    Joan:{
        Griffiths: new User({name: "Joan Griffiths", age: "34", salary: "58000"})
    }
};

exports.users = users;