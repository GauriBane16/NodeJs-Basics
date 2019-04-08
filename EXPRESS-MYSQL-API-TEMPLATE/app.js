var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cors = require("cors");
var compression = require("compression");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var index = require('./routes/index');
var users = require('./routes/users');
var businessRoutes = require(path.resolve('.','modules/business/businessRoutes'))


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var fs = require('fs')
var databaseConnector=require(path.resolve('.','modules/database/databaseConnector'));
var config = require('./config.js');

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc) 

//  apply to all requests 
// app.use(limiter);

app.set('trust proxy', 1) // trust first proxy

app.use(cors());
app.use(businessRoutes);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.pug');

// Server favicon 
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// log only 4xx and 5xx responses to console

app.use(function(req, res, next) {
  // IE9 doesn't set headers for cross-domain ajax requests
  if(typeof(req.headers['content-type']) === 'undefined'){
    req.headers['content-type'] = "application/json; charset=UTF-8";
  }
  next();
})

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);
app.use('/business',businessRoutes)
//app.use('/api', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.stack ="";
  err.status = 404;
  next(err);
});


module.exports = app;


