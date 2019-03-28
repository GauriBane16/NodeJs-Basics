// setTimeout(function(){
//     console.log("1");
// },2000);
// console.log("2");

function printInTwoSecond(msg){
    setTimeout(function(){
        console.log(msg);
    },2000);
}

printInTwoSecond('Hello async..!!!');
