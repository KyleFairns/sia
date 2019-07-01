const frisby = require('frisby');

describe("The User API", () => {

    it("should be able to create a user", () => {
        return frisby.post("http://dummy.restapiexample.com/api/v1/create", {
            "name": "Joan Griffiths", "salary": "58000", "age": "34"
        }).expect('status', 200);
    });

});