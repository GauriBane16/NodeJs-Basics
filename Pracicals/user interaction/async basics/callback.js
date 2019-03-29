var weather = require('./weather.js');
var location = require('./location.js');

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

// It will take location from command line & send to api to fetch weather information
if (argv.l) {
    console.log("Location is provided.");
    weather(argv.l, function (currentWeather) {
        console.log("currentWeather : ", currentWeather);
    });
} else {
    // If there is no location enterd by user through command line, it will fetch location using system's IP addres 
    console.log("Location is not provided.");
    location(function (location) {
        if (!location) {
            console.log('Unable to guess location');
            return;
        }
        // send to api to fetch weather information
        weather(location.city, function (currentWeather) {
            console.log("currentWeather : ", currentWeather);
        })
    });
}


