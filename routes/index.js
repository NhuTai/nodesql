var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "154.16.171.82",
  user: "admin",
  password: "HDy0c0QK",
  port: 18831,
  database: "snack"
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var cus = {};

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM user", function (err, result, fields) {
    if (err) throw err;
    cus = result;
  });
});
router.get('/as', function(req, res, next) {
  res.send(cus);
});
router.post('/create-u', function (req, res) {
  const user = req.body.user;
  con.query("insert into user (name, password) value (?, ?); ", [user.name, user.pass],function (err, result, fields) {
    if (err) throw err;
  });
  console.log(user);
  res.send('done');
})
module.exports = router;
