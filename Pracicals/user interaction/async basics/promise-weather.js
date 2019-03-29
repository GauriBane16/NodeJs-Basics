var request = require('request');

module.exports = function (location) {
    return new Promise(function(resolve,reject){
        // if (!location) {
        //     reject("No location provided");
        // }
        //encodeURIComponent() => escapes the punctuation characters that are used to separate the portionsof a URI
        var encodedLocation = encodeURIComponent(location);
        var url = 'https://openweathermap.org/data/2.5/weather?&q=' + encodedLocation + '&appid=b6907d289e10d714a6e88b30761fae22';
        request({ url: url, json: true }, function (Error, Response, body) {
            if (Error) {
                reject("Unable to fech data");
            }
            else {
                resolve('It\'s ' + body.main.temp + ' in ' + body.name);
            }
        })
    })
}