var express = require('express');
var router = express.Router();
var sql = require("mssql");
var dbConfig = require('../Database/dbConnection');
/* Delete hall booking event */
router.post('/', function (req, res) {
  sql.connect(dbConfig.dbConnection()).then(() => {
      return sql.query("DELETE FROM Hallbookingdetails WHERE Orderno = " + req.body.txthallbookingID);
  }).then(result => {
    var message = 'delete successfully';
    var cancellist = '';
    var edate = '';
    var userId = req.body.txtUserId;
    res.render('hallcancellation', { message: message, cancellist: cancellist, edate: edate, userId: userId });
  }).catch(err => {
      console.log(err)
  })
});

module.exports = router;