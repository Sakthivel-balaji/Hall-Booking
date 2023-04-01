var express = require('express');
var router = express.Router();

var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
var message = '';

/* GET login page. */

router.get('/', function (req, res, next) {
  res.render('login', { message: message });
});

router.post('/', function (req, res, next) {

  var username = req.body.uname;
  var password = req.body.psw;
  
  var sess = req.session;  //initialize session variable
  if (username && password) {
    var loginquery = "SELECT * FROM Users WHERE Username = '" + username + "' AND Password = '" + password + "';";
    
    sql.connect(dbConfig.dbConnection()).then(() => {
      return sql.query(loginquery);
    }).then(result => {
      if (result.rowsAffected > 0) {
        console.log(username);
        console.log(password);
        req.session.loggedin = true;
        // req.session.username = username;
        req.session.userId = result.recordset[0].UserId; //set user id
        req.session.user = result.recordset[0].Username;//set user name
        res.render('home', { user: req.session.user })
      } else {
        message = 'Incorrect Username and/or Password!';
        res.render('login', { message: message });
      }
    }).catch(err => {
      console.log(err)
    })


  } else {
    message = 'Please enter Username and Password!';
    res.render('login', { message: message });
  }
});

module.exports = router;