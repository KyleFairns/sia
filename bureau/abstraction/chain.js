class Chain {
    constructor() {
        this.switches = {};
    }

    get resetSwitches() {
        this.switches = {};
        return this;
    }

    get must(){
        return this;
    }

    get eventually(){
        return this;
    }

    get can(){
        return this;
    }

    get should(){
        return this;
    }

    get be(){
        return this;
    }

    get is(){
        return this;
    }

    get a(){
        return this;
    }

    get and(){
        return this;
    }

    get but(){
        return this;
    }
    get get(){
        return this;
    }

    get not() {
        this.switches.not = true;
        return this;
    }
}

exports.Chain = Chain;