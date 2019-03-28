//var request=require('request');
//var url='https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';

var weather = require('./weather.js');
var location = require('./location.js');

// For command line argument.
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
    weather(argv.l, function (currentWeather) {
        console.log("currentWeather : ", currentWeather);
    });
} else {
   // If there is no location enterd by user through command line, it will fetch location using system's IP addres 
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


// var argv=require('yargs')
// .command("weather","Check out weather of your city",function(yargs){
//     yargs.options({
//         location:{
//             demand:true,
//             alias:'l',
//             type:'string',
//             description:'Location to fetch weather for..!!!'
//         }
//     }).help('help')

// })
// .help('help')
// .argv;

// or


//weather();

//OR


// location(function(location){
//     if(!location){
//         //console.log('Unable to guess location');
//         return;
//     }
//     city=location.city;

//     //console.log('Location : ',location)
//     //console.log('your IP is '+location.ip+' , your address is '+location.city+', '+location.region+', '+location.country+' & location is '+location.loc)
// });

// weather(location(),function(currentWeather){
//     console.log("currentWeather : ",currentWeather);
// });

// request({url:url,json:true},function(Error,Response,body){
//     if(Error){
//         console.log("Unable to fech data");
//     }
//     else{
//         // console.log(JSON.stringify(body,null,4));
//         //console.log("Data: ",body);
//         console.log('It\'s '+ body.main.temp+' in '+body.name);
//         // console.log("City Name: ",body.name);
//         // console.log("Temp: ",body.main.temp);
//     }
// })

//console.log("After request..!!!");