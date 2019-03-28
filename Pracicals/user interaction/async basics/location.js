var url = 'https://ipinfo.io/';
var request = require('request');

module.exports = function (callback) {
    request({ url: url, json: true }, function (Error, Response, body) {
        if (Error) {
            // callback('Unable to guess location');
            callback();
        }
        else
            //callback('your IP is '+body.ip+' , your address is '+body.city+', '+body.region+', '+body.country+' & location is '+body.loc);
            callback(body);
    })
}
