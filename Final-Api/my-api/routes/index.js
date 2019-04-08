var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//testing
router.get('/shootme',function(req,res){
  res.render('index', { title: 'Done' });
  });

module.exports = router;
