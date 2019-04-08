var mysql=require('mysql');
var path = require('path');
var config=require(path.resolve('./','config'));

var mysqlConnection=mysql.createConnection({
    host:config.databaseHost,
    user:config.databaseUser,
    password:config.databasePassword,
    database:config.databaseDatabaseName,
    multipleStatements: true
})

mysqlConnection.connect(function (err){
    if(!err)
     console.log('Database connection succeeded.');
    else
    console.log("Database connection failed with error : "+err);
})

module.exports=mysqlConnection;