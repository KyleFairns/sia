const {Chain} = require("./chain.js"),
    {config} = require("../config_transformer.js"),
    {UrlConstructError} = require("./errors.js"),
    {driver} = require("../browser_setup.js");

class Url extends Chain {
    constructor(url) {
        super();
        let split = /(?<scheme>^https?:\/\/)(?<host>.+?)(?<path>\/.*?)?(?<querystring>[?].*)?$/.exec(url.match(/^https?:\/\//) ? url : `${config.host}${url}`); // https://regex101.com/r/o2XQ3e/2

        if (!split.groups.scheme) {
            throw new UrlConstructError("Scheme (http, https) must be provided");
        } else if (!split.groups.host) {
            throw new UrlConstructError("Host (www.domain.com, 192.168.0.1, etc)");
        } else {
            this.scheme = split.groups.scheme;
            this.host = split.groups.host;
            this.path = split.groups.path || "/"; // Default to root if undefined - avoids "undefined" erroneously being placed in urls
            this.querystring = split.groups.querystring || ""; // Default to empty string - see above
            this.url = `${this.scheme}${this.host}${this.path}${this.querystring}`;
        }
    }

    get navigate() {
        return driver.get(this.url);
    }
}

exports.Url = Url;