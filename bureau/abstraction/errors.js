class TestError extends Error {
    /**
     * @category Errors
     * @constructs
     * @extends Error
     * @param {string} message
     * @classdesc For reporting errors during testing
     * @example throw new TestError(`Error on registrations page: ${e}`)
     */
    constructor(message){
        super();
        this.name = this.constructor.name;
        this.message = message;
        // This makes the stack trace a bit nicer.
        Error.captureStackTrace(this, this.constructor);
    }
}

class FindError extends TestError {

    /**
     * @category Errors
     * @constructs
     * @extends TestError
     * @param {string} message
     * @classdesc For reporting errors during finding elements
     * @example throw new FindError(`Element could not be found: ${e}`)
     */
    constructor(message){
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

class UrlConstructError extends TestError {
    /**
     * @category Errors
     * @constructs
     * @extends TestError
     * @param {string} message
     * @classdesc For reporting errors during constructing urls
     * @example throw new UrlConstructError("Scheme (http, https) must be provided")
     */
    constructor(message){
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

exports.TestError = TestError;
exports.FindError = FindError;
exports.UrlConstructError = UrlConstructError;

