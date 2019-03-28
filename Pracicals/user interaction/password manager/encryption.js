var crypto=require('crypto-js');
var secretKey='abc123';
var secretMessage='I am learning NodeJS';
var encrypted=crypto.AES.encrypt(secretMessage,secretKey);
console.log("Encrypted message : "+encrypted);
var bytes=crypto.AES.decrypt(encrypted,secretKey);
var decrypted=bytes.toString(crypto.enc.Utf8);
console.log("Decrypted message : "+decrypted);

var secretKey='abc123';
var secretMessageObject={
    name:'Gauri',
    code:507
};
var encryptedObj=crypto.AES.encrypt(JSON.stringify(secretMessageObject),secretKey);
console.log("Encrypted message : "+encryptedObj);
var bytes=crypto.AES.decrypt(encryptedObj,secretKey);
var decrypted=JSON.parse(bytes.toString(crypto.enc.Utf8));
console.log("Decrypted message : ",decrypted);
console.log("Decrypted message : "+decrypted.name);