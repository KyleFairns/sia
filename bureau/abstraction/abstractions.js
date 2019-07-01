// Index of Abstractions

// Consider: A wrapper for all of this (gherkin-lang?), that will mean that you will be able to write tests in fully described English
// Given().I.am.on(google.homepage); - Url class passed into step
// When(google.search).is.visible; - Element class passed into step
// And().I.have.filled(google.search).with("Hey, that's pretty good").and.pressed(Key.ENTER); - Element class, string and key press passed into step
// Then(google.result).should.eventually.be.visible; - Element class passed into step

const {Element} = require("./element.js"),
    {Wait} = require("./wait.js"),
    {Browser} = require("./browser.js"),
    {Url} = require("./url.js"),
    {driver} = require("../browser_setup.js"),
    {config} = require("../config_transformer.js"),
    {TestError, FindError} = require("./errors.js");

exports.Element = Element;
exports.Wait = Wait;
exports.Browser = Browser;
exports.Url = Url;
exports.driver = driver;
exports.config = config;
exports.TestError = TestError;
exports.FindError = FindError;
