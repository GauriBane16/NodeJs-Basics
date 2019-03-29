//module.exports to expose middleware
var middleware={
    requireAuthentication:function (req,res,next){
        console.log("You request for private routes..!!!");
        next();
    },
    logger:function (req,res,next){
        console.log('Request: '+req.method+' '+req.originalUrl+' on '+new Date().toString());
        next();
    }
    
}

module.exports=middleware;