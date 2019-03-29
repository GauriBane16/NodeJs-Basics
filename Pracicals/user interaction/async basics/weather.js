//module.exports=1;

// OR

// module.exports={
//     method1:function(){

//     }
// }

// OR

// module.exports=function(){
//     console.log('Here is the weather response in console!!!');
// }

var request = require('request');

module.exports = function (location, callback) {
    if (!location) {
        callback("No location provided");
    }
    //encodeURIComponent() => escapes the punctuation characters that are used to separate the portionsof a URI
    var encodedLocation = encodeURIComponent(location);
    var url = 'https://openweathermap.org/data/2.5/weather?&q=' + encodedLocation + '&appid=b6907d289e10d714a6e88b30761fae22';
    request({ url: url, json: true }, function (Error, Response, body) {
        if (Error) {
            callback("Unable to fech data");
        }
        else {
            callback('It\'s ' + body.main.temp + ' in ' + body.name);
        }
    })
}

