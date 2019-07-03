class Chain {

    /**
     * @category Internal
     * @constructs
     * @classdesc Adds various words to aid readability, turning on switches that methods will handle
     */
    constructor() {
        /**
         *  @memberOf Chain
         *  @method switches
         *  @description A collection of the switches that have been turned on for an element
         *  @example chain.eventually;
         *  @returns Object
         */
        this.switches = {};
    }

    /**
     *  @memberOf Chain
     *  @method resetSwitches
     *  @description Resets all of the switches turned on so that the language chain can continue without error.
     *  @example chain.resetSwitches;
     *  @returns Chain
     */
    get resetSwitches() {
        this.switches = {};
        return this;
    }


    /**
     *  @memberOf Chain
     *  @method eventually
     *  @description A word to add readability
     *  @example chain.eventually;
     *  @returns Chain
     */
    get eventually() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method can
     *  @description A word to add readability
     *  @example chain.can;
     *  @returns Chain
     */
    get can() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method should
     *  @description A word to add readability
     *  @example chain.should;
     *  @returns Chain
     */
    get should() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method be
     *  @description A word to add readability
     *  @example chain.be;
     *  @returns Chain
     */
    get be() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method is
     *  @description A word to add readability
     *  @example chain.is;
     *  @returns Chain
     */
    get is() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method a
     *  @description A word to add readability
     *  @example chain.a;
     *  @returns Chain
     */
    get a() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method and
     *  @description A word to add readability
     *  @example chain.and;
     *  @returns Chain
     */
    get and() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method get
     *  @description A word to add readability
     *  @example chain.get;
     *  @returns Chain
     */
    get get() {
        return this;
    }

    /**
     *  @memberOf Chain
     *  @method not
     *  @description This turns on the "not" switch for the Chain
     *  @example chain.not;
     *  @returns Chain
     */
    get not() {
        this.switches.not = true;
        return this;
    }
}

exports.Chain = Chain;