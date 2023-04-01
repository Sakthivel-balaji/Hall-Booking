var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
var message = '';
var cancellist = '';
var edate = '';

/* GET home page. */
router.get('/', function (req, res, next) {
  var message = '';
  var cancellist = '';
  var edate = '';
  var userId = req.session.userId;
  console.log(userId);
  res.render('hallcancellation', { message: message, cancellist: cancellist, edate: edate, userId: userId });
});

router.post('/', function (req, res, next) {
  var edate = req.body.edate;
  var userId = req.body.txtUserId;
  var userquery = "SELECT * FROM Users WHERE UserId = " + userId;
  var edatequery = "SELECT * FROM Hallbookingdetails WHERE Date = '" + edate + "'";
  if (userId == 1) {
    var cancellist = "SELECT Orderno, Firstname, Lastname, FORMAT (Date, 'dd/MM/yyyy ') as Date, Nameoftheevent FROM Hallbookingdetails INNER JOIN Users ON Hallbookingdetails.UserId=Users.UserId WHERE Date = '" + edate + "'";
  } else {
    var cancellist = "SELECT Orderno, Firstname, Lastname, FORMAT (Date, 'dd/MM/yyyy ') as Date, Nameoftheevent FROM Hallbookingdetails INNER JOIN Users ON Hallbookingdetails.UserId=Users.UserId WHERE Users.UserId = " + userId + " and Date = '" + edate + "'";
  }

  sql.connect(dbConfig.dbConnection()).then(() => {
    return sql.query(edatequery);
  }).then(result => {
    if (result.rowsAffected > 0) {
      message = 'cancellation event date is available';
      console.log('hi')
      sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query(cancellist);
      }).then(result => {
        console.log(result.recordset)
        res.render('deletehallbooking', { cancellist: result.recordset, message: message, edate: edate, userId: userId })
      }).catch(err => {
        console.log(err)
      })
    } else {
      message = 'cancellation event date is not available';
      res.render('hallcancellation', { cancellist: result.recordset, message: message, edate: edate, userId: userId })
    }
  }).catch(err => {
    console.log('hi2')
    console.log(err)
  })
});


module.exports = router;
