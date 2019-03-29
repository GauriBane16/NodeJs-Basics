var storage = require('node-persist');
storage.initSync();

/**
 * Store account information
 * @param {*} account 
 */
function storeAccountInfo(account) {
    if (typeof account !== 'undefined') {
        if (account.name && account.username && account.password) {
            if (typeof (getAccount(account.name)) === 'undefined') {
                var acc = storage.getItemSync('accounts');
                if (typeof acc === 'undefined') {
                    acc = [];
                }
                acc.push(account);
                storage.setItemSync('accounts', acc)
            } else
                console.log("Account info is already exist.");
        }
        else
            console.log("Fill all mandatory information.")
    }
    else
        console.log("Fill information to store account info.")
}

/** Get account info by username
 * @param {*} userName 
 */
function getAccount(name) {
    var master;
    var accounts = storage.getItemSync('accounts');
    if (typeof accounts !== 'undefined') {
        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].name === name)
                master = accounts[i];
        }
    }
    return master;
}

/**
 * List of all stored accounts
 */
function listAllAccounts() {
    var accounts = storage.getItemSync('accounts');
    if (typeof accounts !== 'undefined') {
        for (var i = 0; i < accounts.length; i++) {
            console.log(accounts[i]);
        }
    }
    else {
        console.log("There is no account");
    }
}

storeAccountInfo({ name: 'facebook', username: 'Priyanka', password: 'abc123' });
storeAccountInfo({ name: 'twitter', username: 'Priyanka', password: 'abc123' });
listAllAccounts();