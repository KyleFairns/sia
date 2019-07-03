// New runner for the framework, so we can add things like cross browser execution once Browserstack is integrated,
// documentation tools and even add in a reporter
const consoleArgs = process.argv,
    {exec} = require('child_process');


let args = {},
    run = '';

exec(`mkdir docs`);

// Break apart arguments so that any with values get assigned their values. Those without values are set to true
// The first two arguments are the word "node" and the path to this file, hence starting the loop from the 3rd argument
for (let i = 2; consoleArgs.length > i; i++) {
    if (consoleArgs[i].match(/^--?/) !== null) {
        args[consoleArgs[i]] = true;
    } else {
        args[consoleArgs[i - 1]] = consoleArgs[i]
    }
}

if (args['-h'] || args['--help']) {

    let arguments = [
            ["--help, -h", "Displays this help message"],
            ["--documentation, -d", "Fires JSDoc and opens the documentation"],
            ["--run, -r", "Runs the Mocha tests"],
            ["--install, -i", "Runs npm install script"]
        ],
        longest = arguments[1][0];

    // Cycle through, and format, printing each command line by line
    console.log("");
    arguments.forEach((argument) => {
        let split = argument[0].split(", "),
            spaces = argument[0].length % 4,
            tabs = Math.floor((longest.split(', ')[0].length) / 4) - Math.floor(split[0].length / 4);

        console.log(`${"    "}${split[0]}${"    ".repeat(tabs+1)}${" ".repeat(4-spaces)}${split[1]}\t${argument[1]}`)
    });
    process.exit(0);
}

if ((args['-i'] || args['--install']) && !args['-h'] && !args['--help']) {
    exec(`npm install`, (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.error(`${stderr}`);
    });
}

if ((args['-d'] || args['--documentation']) && !args['-h'] && !args['--help']) {
    exec(`.\\node_modules\\.bin\\jsdoc -c "./jsdoc.json"`, (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.error(`${stderr}`);
    });

}

if ((args['-r'] || args['--run']) && !args['-h'] && !args['--help']) {
    exec('.\\node_modules\\.bin\\mocha -t 20000 --recursive .\\test_suite\\', (error, stdout, stderr) => {
        console.log(`${stdout}`);
        console.error(`${stderr}`);
    });
}