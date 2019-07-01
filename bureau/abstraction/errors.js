class TestError extends Error {
    constructor(message){
        super();
        this.name = this.constructor.name;
        this.message = message;
        // This makes the stack trace a bit nicer.
        Error.captureStackTrace(this, this.constructor);
    }
}

class FindError extends TestError {
    constructor(message){
        super();
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class UrlConstructError extends TestError {
    constructor(message){
        super();
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

exports.TestError = TestError;
exports.FindError = FindError;
exports.UrlConstructError = UrlConstructError;

