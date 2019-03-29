var name = "Gauri";
function greet(name) {
  if (typeof name !== 'undefined')
    console.log("Hello " + name + " ..!!");
  else
    console.log("Hello");
}

greet(name);
greet("Yashraj");
greet();