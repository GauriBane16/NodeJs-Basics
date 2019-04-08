var path=require('path');
var con=require(path.resolve('./','modules/database/databaseConnector'));

exports.register=function (req,res){

    
    accountChk(req.body).then(function(result){
            return signupuser(req.body,result);
    }).then(function(res1){
        if(res1){
            res.send({message:"Successful"});
        }
        else{
            res.send({message:"User is already exist"});
        }
    })
    .catch(function (err){
        res.send("Something went wrong");
    })


}

function accountChk(req){
    console.log("Req ",req);
    return new Promise(function (resolve,reject){
        var sql="SELECT * FROM tbluser WHERE emailid=? and password=?";
        con.query(sql,[req.emailid,req.password],function(error,result){
          if(error)
            reject();
          else{
              console.log("Result ",result)
              if(result.length>0)
                resolve(false);
              else
              resolve(true);   
          }  
        })
    })
}

function signupuser(req,result){
    return new Promise(function (resolve,reject){
        if(!result)
        resolve(false); 
    var sql="INSERT INTO tbluser (username,emailid,password) values (?,?,?)";
    con.query(sql,[req.username,req.emailid,req.password],function(error,result){
      if(error)
        reject();
      else{
          console.log("Result : ",result);
          if(result)
            resolve(true);
          else
          resolve(false);   
      }  
    })
})
}