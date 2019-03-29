var url = 'https://ipinfo.io/';
var request = require('request');
var argv = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        description: 'Location to fetch weather for',
        type: 'string'
    }).help('help')
    .argv;

var cmd = argv._[0];

module.exports = function () {
    return new Promise(function (resolve,reject){
        if (argv.l)
            resolve(argv.l);
        else{    
        request({ url: url, json: true }, function (Error, Response, body) {
            if (Error) {
                // callback('Unable to guess location');
                reject('Unable to guess location');
            }
            else
                //callback('your IP is '+body.ip+' , your address is '+body.city+', '+body.region+', '+body.country+' & location is '+body.loc);
                resolve(body.city);
        })
    }
    })
    
}