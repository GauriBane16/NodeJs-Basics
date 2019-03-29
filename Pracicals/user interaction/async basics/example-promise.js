var weather = require('./promise-weather.js');
var location = require('./promise-location.js');

// setup yargs to have a --location or -l arguments
// var argv = require('yargs')
//     .option('location', {
//         alias: 'l',
//         demand: false,
//         description: 'Location to fetch weather for',
//         type: 'string'
//     }).help('help')
//     .argv;

// var cmd = argv._[0];

// It will take location from command line & send to api to fetch weather information
// if (argv.l) {
//     weather(argv.l).then(function(currentWeather){
//         console.log("currentWeather : ", currentWeather);
//     },function(err){
//         console.log("Error",err);
//     })
// } else {
    // If there is no location enterd by user through command line, it will fetch location using system's IP addres 
    location().then(function (location){
        return weather(location);
    }).then(function(currentWeather){
        console.log("currentWeather : ", currentWeather);
    }).catch(function(err){
        console.log("Error: ",err);
    })
// }




