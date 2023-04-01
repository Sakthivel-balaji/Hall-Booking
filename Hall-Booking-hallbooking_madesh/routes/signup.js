var express = require('express');
var router = express.Router();

var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
var message = '';

/* GET signup page. */

router.get('/', function (req, res, next) {
  res.render('signup', { message: message });
});

router.post('/', function (req, res, next) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var emailid = req.body.emailid;
  var contactno = req.body.contactno;
  var username = req.body.username;
  var password = req.body.password;
  var address = req.body.address;

  sql.connect(dbConfig.dbConnection()).then(() => {
    return sql.query("SELECT * FROM Users WHERE Username = '" + username + "' or Contactno = '" + contactno + "';");
  }).then(result => {
    // res.render('home', { studentList: result.recordset }) //res.render() pass a local variable to the view
    if (result.rowsAffected > 0) {
      message = 'User Name or Contact No are already exists.';
      res.render('signup', { message: message });
    } else {
        sql.connect(dbConfig.dbConnection()).then(() => {
          return sql.query("INSERT INTO Users (FirstName,LastName,EmailId,Contactno,Username,Password,Address) VALUES('" + firstname + "','" + lastname + "','" + emailid + "','" + contactno + "','" + username + "','" + password + "','" + address + "')");
      }).then(result => {
        message = 'Register successful';
        res.render('login', { message: message })
      }).catch(err => {
          console.log(err)
      })
    }
  }).catch(err => {
    console.log(err)
  })
});

module.exports = router;