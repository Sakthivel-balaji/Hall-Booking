var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
var message = '';

/* GET home page. */
router.get('/', function (req, res, next) {
  var message = '';
  var edate = '';
  var userId = req.session.userId
  var userquery = "SELECT * FROM Users WHERE UserId = " + userId;
  sql.connect(dbConfig.dbConnection()).then(() => {
    return sql.query(userquery);
  }).then(result => {
    console.log(result.recordset)
    res.render('hallbooking', { userList: result.recordset, message: message, edate: edate })
  }).catch(err => {
    console.log(err)
  })
});

router.post('/', function (req, res, next) {
  var ename = req.body.ename;
  var edate = req.body.edate;
  var eamountpaid = req.body.eamountpaid;
  var emodeofpayment = req.body.emodeofpayment;
  var userId = req.body.txtUserId
  var userquery = "SELECT * FROM Users WHERE UserId = " + userId;
  if (userId == 1) {
    var listquery = "SELECT Users.Firstname as Firstname, Users.Lastname as Lastname, FORMAT (Date, 'dd/MM/yyyy ') as Date, Nameoftheevent FROM Hallbookingdetails INNER JOIN Users ON Hallbookingdetails.UserId=Users.UserId";
  } else {
    var listquery = "SELECT Users.Firstname as Firstname, Users.Lastname as Lastname, FORMAT (Date, 'dd/MM/yyyy ') as Date, Nameoftheevent FROM Hallbookingdetails INNER JOIN Users ON Hallbookingdetails.UserId=Users.UserId WHERE Users.UserId = " + userId;
  }
  var edatequery = "SELECT * FROM Hallbookingdetails WHERE Date = '" + edate + "'";
  var insertqueryhallbookingdetails = "INSERT INTO Hallbookingdetails (Date,Nameoftheevent,Amountpaid,Modeofpayment,UserId) VALUES('" + edate + "','" + ename + "','" + eamountpaid + "','" + emodeofpayment + "','" + userId + "')";

  sql.connect(dbConfig.dbConnection()).then(() => {
    return sql.query(edatequery);
  }).then(result => {
    console.log('hi')
    // res.render('home', { studentList: result.recordset }) //res.render() pass a local variable to the view
    if (result.rowsAffected > 0) {
      message = 'this event date are already exists.';
      sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query(userquery);
      }).then(result => {
        console.log(result.recordset)
        res.render('hallbooking', { userList: result.recordset, message: message, edate: edate })
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log('Hall Booking successful 1');
      sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query(insertqueryhallbookingdetails);
      }).then(result => {
        message = 'Hall Booking successful';
        console.log('Hall Booking successful 2');
        sql.connect(dbConfig.dbConnection()).then(() => {
          return sql.query(listquery);
        }).then(result => {
          console.log(result.recordset)
          res.render('hallbookingdetails', { bookingList: result.recordset, message: message })
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }).catch(err => {
    console.log('hi2')
    console.log(err)
  })
});

module.exports = router;
