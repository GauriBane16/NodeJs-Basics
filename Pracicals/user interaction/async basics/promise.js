// function dowork(data,callback){
//     callback("Done");
// }

// function doWorkPromise(data){
//     return new Promise(function (resolve,reject){
//         if(data){
//             // resolve("Everything Ok.");
//             setTimeout(function (){
//                 resolve("Everything Ok.");
//             },1000)
//         }
//         else
//             reject({
//                 error:"Something went wrong."
//             })    
//     })
// }

// doWorkPromise("Some data").then(function (result){
//     return TextTrac(result).then(function(data2){

//     })
//     console.log("result of 1st call",result);
// },function (error){
//     console.log("Error in 1sy call",error.error);
// })
// doWorkPromise().then(function (result){
//     console.log("result of 2nd call",result);
// },function (error){
//     console.log("Error in 2nd call",error.error);
// })

// var weather = require('./weather.js');
// var location = require('./location.js');
var url = 'https://ipinfo.io/';
var request = require('request');
// setup yargs to have a --location or -l arguments
var argv = require('yargs')
    .option('location', {
        alias: 'l',
        demand: false,
        description: 'Location to fetch weather for',
        type: 'string'
    }).help('help')
    .argv;

var cmd = argv._[0];


function getLocation() {
    return new Promise(function (resolve, reject) {
        // It will take location from command line & send to api to fetch weather information
        if (argv.l) {
            resolve(argv.l);
        } else {
            // If there is no location enterd by user through command line, it will fetch location using system's IP addres 
            request({ url: url, json: true }, function (Error, Response, body) {
                if (Error) {
                    // callback('Unable to guess location');
                    reject({
                        error: 'Something went wrong'
                    });
                }
                else
                    //callback('your IP is '+body.ip+' , your address is '+body.city+', '+body.region+', '+body.country+' & location is '+body.loc);
                    resolve(body.city);
            })
        }
    })

}

function getWeather(city) {
    return new Promise(function (resolve, reject) {
        //encodeURIComponent() => escapes the punctuation characters that are used to separate the portionsof a URI
        var encodedLocation = encodeURIComponent(city);
        var finalurl = 'https://openweathermap.org/data/2.5/weather?&q=' + encodedLocation + '&appid=b6907d289e10d714a6e88b30761fae22';
        request({ url: finalurl, json: true }, function (Error, Response, body) {
            if (Error) {
                reject({ error: "Unable to fech data" });
            }
            else {
                resolve('It\'s ' + body.main.temp + ' in ' + body.name);
            }
        })
    })
}

getLocation().then(function (location) {
    if (location) {
        getWeather(location)
            .then(function (currentWeather) {
                console.log("currentWeather : ", currentWeather);
            },
                function (error) {
                    console.log("Error", error.error);
                })
    }
},
    function (error) {
        console.log("Error of getLocation", error.error);
    })
