var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
var message = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  var message = '';
  res.render('hallavailability', { message: message });
});

router.post('/', function (req, res, next) {
  var edate = req.body.edate;
  var userId = req.session.userId;
  var userquery = "SELECT * FROM Users WHERE UserId = " + userId;
  var edatequery = "SELECT * FROM Hallbookingdetails WHERE Date = '" + edate + "'";

  sql.connect(dbConfig.dbConnection()).then(() => {
    return sql.query(edatequery);
  }).then(result => {
    if (result.rowsAffected > 0) {
      message = 'this event date are already exists. Please try another hall availability';
      res.render('hallavailability', { message: message })
    } else {
      message = 'This date hall availability is there';
      
      sql.connect(dbConfig.dbConnection()).then(() => {
        return sql.query(userquery);
      }).then(result => {
        console.log(result.recordset)
        res.render('hallbooking', { userList: result.recordset, message: message, edate: edate })
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
