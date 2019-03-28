console.log("Starting password manager");
var storage=require('node-persist');
storage.initSync();
//storage.setItemSync('name','Gauri');
var name=storage.getItemSync('name');
console.log("Name : ",name);
// storage.setItemSync('name','sunita');
console.log("Changed: ",storage.getItemSync('name'));
// storage.setItemSync('account',[{username:'Gauri',balance:0}]);
var account=storage.getItemSync('account');
console.log("Account : ",account);
account.push({username:'Sunita',balance:0})
storage.setItemSync('account',account)

console.log("Accountaray : ",account);
