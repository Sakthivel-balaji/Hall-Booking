var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user =  req.session.user,
	userId = req.session.userId;
  if(userId == null){
		res.render('login');
		return;
	}else {
    res.render('home', { user: user });
  }
});

module.exports = router;
