// function doWork(){
//     throw new Error("Unable to proceed");
// }
// try{
//     //throw new Error("Unable to proceed");
//     doWork();
// }catch(e){
//     console.log("Error",e.message);
//     //console.log("Something went wrong");
// }finally{
//     console.log("Finally block executed.");
// }
// console.log("Try-catch ended");

var crypto=require('crypto-js');
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
            },
            masterPassword: {
                demand: true,
                alias: 'mpwd',
                type: 'string',
                description: 'Master Password goes here'
            }
        }).help('help');
    })
    .command('getDetail', 'Get details of account', function (yargs) {
        yargs.options({
            username: {
                demand: true,
                alias: 'un',
                type: 'string',
                description: 'Username goes here'
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
var cmd = argv._[0];
// console.log("Command", cmd);
var storage = require('node-persist');
storage.initSync();
var accounts = storage.getItemSync('encrypteddata');
// console.log("accounts",accounts)
switch (cmd) {
    case 'create': if (argv.an && argv.un && argv.pwd && argv.mpwd){
        try{
            storeAccountInfo({ accountName: argv.name, userName: argv.un, password: argv.pwd},argv.mpwd);
        }catch(e){
            console.log("Wrong master password");
        }
        // finally{
        //     console.log("Finally block executed.");
        // }
    }
        
    else
        console.log("Value should not be empty");
        break;
    case 'getDetail': if (argv.un && argv.mpwd){
        try{
            //throw new Error("Unable to proceed");
            getDetails(argv.un,argv.mpwd);
        }catch(e){
           // console.log("Error",e.message);
            console.log("Wrong username or wrong master password");
        }
        // finally{
        //     console.log("Finally block executed.");
        // }
    }
        
    else
        console.log("Value should not be empty");
        break;
    case 'listOfAllAccounts': if(argv.mpwd){
        try{
            //throw new Error("Unable to proceed");
            listOfAllAccounts(argv.mpwd);
        }catch(e){
            //console.log("Error",e.message);
            console.log("wrong master password");
            //console.log("Something went wrong");
        }
        // finally{
        //     console.log("Finally block executed.");
        // }
    }
                                
                             break;
    case 'gethelp': console.log("Available commands are 'create', 'getDetail','listOfAllAccounts' & 'gethelp'")
        break;    
    default:  console.log("You enterd wrong command, kindly use 'gethelp' command to get details of available command");  
}

           
function storeAccountInfo(account,secretkey) {
    if (typeof accounts === 'undefined')
        accounts = [];
        console.log("Account : ",account);
        console.log("secretkey : ",secretkey);
    if (!Verify(account.name,secretkey)) {
        console.log("Accounts Array: ",accounts);
        var data=crypto.AES.encrypt(JSON.stringify(account),secretkey);
        console.log("Data"+data);
        accounts.push(data.toString());
        console.log("Accounts : ",accounts);
        storage.setItemSync('encrypteddata', accounts);
        console.log("Account created successfully");
    } else {
        console.log("Account is already exist");
    }
}
function Verify(name,secretkey) {
    var matchedAccount = false
    if (typeof accounts !== 'undefined') {
        // console.log("Accounts in verify: ",JSON.parse(accounts));
        accounts.forEach(function (account) {
            var data=decryptData(account,secretkey)
            if (data.name === name) {
                matchedAccount = true;
                // console.log(account);
            }
        });
    }

    return matchedAccount;
}

function getDetails(username,secretkey) {
    var matchedAccount = false
    if (typeof accounts !== 'undefined') {
        accounts.forEach(function (account) {
            var data=decryptData(account,secretkey)
            if (data.userName === username) {
                matchedAccount = true;
                console.log(data);
            }
        });
    }
    else {
        console.log("Sorry, There is no account for entered username");

    }
    return matchedAccount;
}

function listOfAllAccounts(secretkey) {
    if (typeof accounts !== 'undefined') {
        accounts.forEach(function (account) {
            var data=decryptData(account,secretkey)
            console.log(data);
        });
    }
    else {
        console.log("Sorry, There are no account");
    }
}

function decryptData(account,secretkey){
    var bytes=crypto.AES.decrypt(account,secretkey);
            return (JSON.parse(bytes.toString(crypto.enc.Utf8)));
}

