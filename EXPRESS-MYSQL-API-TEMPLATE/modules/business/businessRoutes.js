var path = require('path');
//var api = require(path.resolve('.', 'modules/user/userController.js'));
var api = require('./../../modules/business/businessController.js');
var express = require('express');
var router = express.Router();

router.post('/AddUpdateForData', api.AddUpdateForData);
router.post('/getformdatabyID',api.getformdatabyID)

module.exports = router;