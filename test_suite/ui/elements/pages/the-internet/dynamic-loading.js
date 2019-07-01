const {Element} = require(`${process.cwd()}/bureau/abstraction/abstractions`);


let dynamic = {
    loading:{
        start: new Element({css: "#start button"}),
        bar: new Element({id: "loading"}),
        loaded: new Element({css: "#finish h4"})
    }
};

exports.dynamic = dynamic;