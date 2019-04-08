var express=require('express');
var path=require('path');
var api=require(path.resolve('./','modules/user/userController'));
var router=express.Router();

router.post('/register',api.register);
// router.post('/login',api.login);

module.exports=router;