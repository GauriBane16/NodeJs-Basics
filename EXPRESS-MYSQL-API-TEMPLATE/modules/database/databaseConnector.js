var mysql = require('mysql');
var path = require('path');
var config = require(path.resolve('./', 'config'))

var con = mysql.createConnection({
    host: config.databaseHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseDatabaseName,
    multipleStatements: true
});

con.connect(function (err) {
    if (err) {
        console.log('Error connecting to Database');
        return;
    } 
    console.log('Connection established @' +config.databaseHost );
});

module.exports = con;