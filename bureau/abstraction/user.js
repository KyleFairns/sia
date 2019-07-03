const {Chain} = require("./chain.js");

class User extends Chain {

    /**
     * @category API
     * @constructs
     * @extends Chain
     * @param {Object} details All details needed for the user
     * @classdesc For user detail storage
     * @example new User({name: "Joan Griffiths", age: "34", salary: "58000"})
     */
    constructor(details){
        super();

        /**
         * @name name
         * @memberOf User
         * @description Gets the name of the user
         * @returns string
         * @example user.get.name
         */
        this.name = details.name;
        /**
         * @name salary
         * @memberOf User
         * @description Gets the salary of the user
         * @returns string
         * @example user.get.salary
         */
        this.salary = details.salary;

        /**
         * @name age
         * @memberOf User
         * @description Gets the age of the user
         * @returns string
         * @example user.get.age
         */
        this.age = details.age;
    }
}

exports.User = User;