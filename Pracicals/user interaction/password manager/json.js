var person='{"name":"Gauri"}';
console.log("Original type: ",typeof person)
console.log("Original: ",person)

var personJSON=JSON.parse(person)
console.log("After converting in json type: ",typeof personJSON)
console.log("After converting in json: ",personJSON)
personJSON.favColor="black";
personJSON.money=10000;
console.log("After adding favColor property in json: ",personJSON)
var personString=JSON.stringify(personJSON)
console.log("After converting in string type: ",typeof personString)
console.log("After converting in string: ",personString)