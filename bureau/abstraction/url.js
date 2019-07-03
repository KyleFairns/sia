const {Chain} = require("./chain.js"),
    {config} = require("../config_transformer.js"),
    {UrlConstructError} = require("./errors.js"),
    {driver} = require("../browser_setup.js");

class Url extends Chain {

    /**
     * @category UI Interactions
     * @constructs
     * @extends Chain
     * @param {string} url Can be a full url, or partial url completed by the host in the config file
     * @classdesc For navigation using urls
     * @example new Element({css: 'input[name="q"]'});
     */
    constructor(url) {
        super();
        let split = /(?<scheme>^https?:\/\/)(?<host>.+?)(?<path>\/.*?)?(?<querystring>[?].*)?$/.exec(url.match(/^https?:\/\//) ? url : `${config.host}${url}`); // https://regex101.com/r/o2XQ3e/2

        if (!split.groups.scheme) {
            throw new UrlConstructError("Scheme (http, https) must be provided");
        } else if (!split.groups.host) {
            throw new UrlConstructError("Host (www.domain.com, 192.168.0.1, etc) must be provided");
        } else {
            /**
             * @name scheme
             * @memberOf Url
             * @description Gets the scheme (protocol) of the url
             * @returns string
             * @example url.get.scheme
             *
             */
            this.scheme = split.groups.scheme;

            /**
             * @name host
             * @memberOf Url
             * @description Gets the host (domain) of the url
             * @returns string
             * @example  url.get.host
             *
             */
            this.host = split.groups.host;

            /**
             * @name path
             * @memberOf Url
             * @description Gets the path of the url
             * @returns string
             * @example  url.get.path
             */
            this.path = split.groups.path || "/"; // Default to root if undefined - avoids "undefined" erroneously being placed in urls

            /**
             * @name querystring
             * @memberOf Url
             * @description Gets the querystring of the url
             * @returns string
             * @example  url.get.querystring
             */
            this.querystring = split.groups.querystring || ""; // Default to empty string - see above

            /**
             * @name url
             * @memberOf Url
             * @description Gets the full url
             * @returns string
             * @example  url.get.url
             */
            this.url = `${this.scheme}${this.host}${this.path}${this.querystring}`;
        }
    }

    /**
     * @name navigate
     * @memberOf Url
     * @description Navigates to the url
     * @returns {Promise<*>}
     * @example await url.navigate
     */
    get navigate() {
        return driver.get(this.url);
    }
}

exports.Url = Url;