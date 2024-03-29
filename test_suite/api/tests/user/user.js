const pom = require(`${process.cwd()}/test_suite/pom/pom.js`).pom,
    Joan = pom.users.Joan,
    create = pom.urls.api.create;

describe("The User API", () => {

    it("should be able to create a user", () => {
        return create.user.post({
            "name": Joan.Griffiths.name, "salary": Joan.Griffiths.salary, "age": Joan.Griffiths.age
        }).expect('status', 200);
    });

});