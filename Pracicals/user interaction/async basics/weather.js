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

module.exports = function (location,callback) {
    if(!location){
        callback("No location provided");
    }
    var encodedLocation=encodeURIComponent(location);
    var url='https://openweathermap.org/data/2.5/weather?&q='+encodedLocation+'&appid=b6907d289e10d714a6e88b30761fae22';
    request({ url: url, json: true }, function (Error, Response, body) {
        if (Error) {
            callback("Unable to fech data");
        }
        else {
            callback('It\'s ' + body.main.temp + ' in ' + body.name);
        }
    })
}

//var url = 'https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22';
//var url='https://openweathermap.org/data/2.5/weather?&q=Nashik Division, IN&appid=b6907d289e10d714a6e88b30761fae22';
//var url='https://openweathermap.org/data/2.5/weather';
//var finalUrl;




// location(function(location){
//     if(!location){
//         //console.log('Unable to guess location');
//         return;
//     }
//     city=location.city;

//     //console.log('Location : ',location)
//     //console.log('your IP is '+location.ip+' , your address is '+location.city+', '+location.region+', '+location.country+' & location is '+location.loc)
// });

//  finalUrl=url+'?&q='+city+'&appid='+aapid;
//  console.log("Final url: "+finalUrl);