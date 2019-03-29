function printInTwoSecond(msg) {
    setTimeout(function () {
        console.log(msg);
    }, 2000);
}

printInTwoSecond('Hello async..!!!');

