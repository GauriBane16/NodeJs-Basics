const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
var app=express();
 var userRoutes=require(path.resolve('./','modules/user/userRoutes'))

var config=require(path.resolve('./','config'));
var con=require(path.resolve('./','modules/database/databaseConnector'));

app.use(bodyParser.json());
 app.use(userRoutes);

app.get('/',(req,res) =>
    res.send("Hello world")
)

// app.get('/employeeList',(req,res) => {
//     con.query("SELECT * FROM tblemployee", (err,result) => {
//         if(err){
//             console.log("There is error : "+err);
//             res.status(404).send({message:'No data'});
//         }
//         else{
//            console.log("Response",JSON.stringify(result));
//            res.send({data:result});
//         }
//     })
// })
app.listen(config.port,() =>
    console.log("Server is running on "+config.port)
    );
