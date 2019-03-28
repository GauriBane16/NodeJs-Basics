var argv = require('yargs')
    .command('create', 'Create account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'an',
                type: 'string',
                description: 'Account Name goes here'
            },
            username: {
                demand: true,
                alias: 'un',
                type: 'string',
                description: 'Username goes here'
            },
            password: {
                demand: true,
                alias: 'pwd',
                type: 'string',
                description: 'Password goes here'
            }

        }).help('help');
    })
    .command('getDetail', 'Get details of account', function (yargs) {
        yargs.options({
            name: {
                demand: true,
                alias: 'an',
                type: 'string',
                description: 'Account name goes here'
            }
        }).help('help');
    })
    .command('listOfAllAccounts', 'Get list of all accounts', function (yargs) {
        yargs.options({})
            .help('help');
    })
    .command('gethelp', 'List of all available commands', function (yargs) {
        yargs.options({})
            .help('help');
    })
    .help('help')
    .argv;

//It contains user defined cmd
var cmd = argv._[0];

var storage = require('node-persist');
storage.initSync();
var accounts = storage.getItemSync('accountsdata');

switch (cmd) {
    case 'create': if (argv.an && argv.un && argv.pwd)
        storeAccountInfo({ accountName: argv.name, userName: argv.un, password: argv.pwd });
    else
        console.log("Value should not be empty");
        break;
    case 'getDetail': if (argv.un)
        getDetails(argv.un);
    else
        console.log("Value should not be empty");
        break;
    case 'listOfAllAccounts': listOfAllAccounts();
        break;
    case 'gethelp': console.log("Available commands are 'create', 'getDetail','listOfAllAccounts' & 'gethelp'")
        break;
    default: console.log("You enterd wrong command, kindly use 'gethelp' command to get details of available command");
}

/**Store Account Info */
function storeAccountInfo(account) {
    if (typeof accounts === 'undefined')
        accounts = [];
    if (!Verify(account.userName)) {
        accounts.push(account);
        storage.setItemSync('accountsdata', accounts);
        console.log("Account created successfully");
    } else {
        console.log("Account is already exist");
    }
}

/**Verify to prevent duplicate entry of account Info */
function Verify(name) {
    var matchedAccount = false
    if (typeof accounts !== 'undefined') {
        accounts.forEach(function (account) {
            if (account.an === name) {
                matchedAccount = true;
            }
        });
    }
    return matchedAccount;
}

/**Get perticular account Info */
function getDetails(name) {
    var matchedAccount = false
    if (typeof accounts !== 'undefined') {
        accounts.forEach(function (account) {
            if (account.an === name) {
                matchedAccount = true;
                console.log(account);
            }
        });
    }
    else {
        console.log("Sorry, There is no account for entered account name");
    }
    return matchedAccount;
}

/**Get list of all stored account*/
function listOfAllAccounts() {
    if (typeof accounts !== 'undefined') {
        accounts.forEach(function (account) {
            console.log(account);
        });
    }
    else {
        console.log("Sorry, There are no account");
    }
}