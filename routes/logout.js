var express = require('express');
var router = express.Router();
var message = '';
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.session.user && req.cookies.user_sid) {
    console.log('hi')
    res.clearCookie('user_sid');
    req.session.loggedin = false;
    req.session.destroy();
    res.render('login', { message: message });
  } else {
    res.render('login', { message: message });
  }
  
});

module.exports = router;
