var argv = require('yargs')
    .command('hello', 'Greets the user', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'n',
                description: 'Your firstname goes here.'
            },
            lastname: {
                demand: true,
                alias: 'ln',
                description: 'Your lastname goes here.'
            }
        }).help('help');
    })
    .help('help')
    .argv;
var cmd = argv._[0];
console.log("Command", cmd);
if (typeof cmd !== 'undefined' && typeof argv.name !== 'undefined' && typeof argv.lastname !== 'undefined') {
    console.log("Hello " + argv.name + " " + argv.lastname + " !");
} else if (typeof cmd !== 'undefined' && typeof argv.name !== 'undefined') {
    console.log("Hello " + argv.name + " !");
} else if (typeof cmd !== 'undefined') {
    console.log("Hello world..!!");
} else
    console.log("Try again & give command line argument..!!!");