var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
var message = '';

/* GET home page. */
router.get('/', function(req, res, next) {
  var userId = req.session.userId
  if (userId == 1) {
    var listquery = "SELECT Users.Firstname as Firstname, Users.Lastname as Lastname, FORMAT (Date, 'dd/MM/yyyy ') as Date, Nameoftheevent FROM Hallbookingdetails INNER JOIN Users ON Hallbookingdetails.UserId=Users.UserId";
  } else {
    var listquery = "SELECT Users.Firstname as Firstname, Users.Lastname as Lastname, FORMAT (Date, 'dd/MM/yyyy ') as Date, Nameoftheevent FROM Hallbookingdetails INNER JOIN Users ON Hallbookingdetails.UserId=Users.UserId WHERE Users.UserId = " + userId;
  }
  sql.connect(dbConfig.dbConnection()).then(() => {
    return sql.query(listquery);
  }).then(result => {
    console.log(result.recordset)
    res.render('hallbookingdetails', { bookingList: result.recordset, message: message })
  }).catch(err => {
    console.log(err)
  })
});

module.exports = router;
