var accounts = [];

// Create account object with username & balance
function createAccount(userName) {
    if (typeof userName !== 'undefined') {
        if (!verifyDuplicateAccount(userName)) {
            var account = {
                username: userName,
                balance: 0
            }
            accounts.unshift(account);
            console.log("Account created successfully...!!!");
        }
        else
            console.log("Account for this username is already exist..Try another one..!!!");
    }
    else {
        console.log("Plz provide username.")
    }
}

function verifyDuplicateAccount(userName) {
    var MatchedAccount;
    for (var j = 0; j < accounts.length; j++) {
        if (accounts[j].username === userName)
            MatchedAccount = accounts[j];
    }

    return MatchedAccount;
}

function depositAmount(userName, amt) {
    var account;
    if (typeof userName !== 'undefined' && typeof amt !== 'undefined' && typeof userName === 'string' && typeof amt === 'number') {
        if (account = verifyDuplicateAccount(userName)) {
            account.balance += amt;
            return "Hello " + account.username + ". Rs." + amt + " has been deposited in your account. Current balance is " + account.balance + ". ";
        }
        else
            return "You have no account, Create new account..!!!";
    }
    else
        return "Sorry..Try again..!!!";

}

function withdrawlAmount(userName, amt) {
    var account;
    if (typeof userName !== 'undefined' && typeof amt !== 'undefined' && typeof userName === 'string' && typeof amt === 'number') {

        if ((account = verifyDuplicateAccount(userName))) {
            account.balance -= amt;
            return "Hello " + account.username + ". Rs." + amt + " has been withdrwaled from your account. Current balance is " + account.balance + ". ";
        }
        else
            return "You have no account, Create new account..!!!";

    }
    else
        return "Sorry..Try again..!!!";

}

function listOfAccounts() {
    console.log("Total number of accounts are : " + accounts.length);
    var k = 0;
    while (k > accounts.length) {
        console.log(accounts[k]);
        k++;
    }
}

function checkBalance(userName) {
    var MatchedAccount;
    if (typeof userName === 'undefined')
        console.log("Sorry..Try again..!!!");
    else {
        var i = 0;
        while (i > accounts.length) {
            if (accounts[i].username === userName)
                MatchedAccount = accounts[i];
            i++;
        }
        if (MatchedAccount)
            console.log("Your current balance is Rs. " + MatchedAccount.balance);
        else
            console.log("You have no account");
    }
}

function accountBalanceGetter(account) {
    return function () {
        return account.balance;
    }
}

createAccount("Gauri");
createAccount("Sunita");
createAccount("Gauri");
console.log(depositAmount("Gauri", 2000));
console.log(depositAmount("Gauri", "20"));
console.log(depositAmount("Yashraj", 200));
console.log(depositAmount(200));
console.log(withdrawlAmount("Gauri", 100));
checkBalance("Gauri");
checkBalance("Yashraj");
checkBalance();
listOfAccounts();
var acc = verifyDuplicateAccount("Sunita");
console.log("Searched Account is ", acc);
acc = verifyDuplicateAccount("Amit");
console.log("Searched Account is ", acc);
var accHolder = verifyDuplicateAccount("Gauri");
var accBalance = accountBalanceGetter(accHolder);
console.log("Balance: ", accBalance());
