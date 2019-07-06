const {Chain} = require("./chain.js");

class User extends Chain {

    /**
     * @category API
     * @constructs
     * @extends Chain
     * @param {Object} details All details needed for the user. Will be able to be accessed as the object describes
     * @classdesc For user detail storage
     * @example new User({name: "Joan Griffiths", age: "34", salary: "58000"}).name
     */
    constructor(details){
        super();

        let keys = Object.keys(details);

        keys.forEach((key)=>{
            this[key] = details[key];
        });
    }
}

exports.User = User;