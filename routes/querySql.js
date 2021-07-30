var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var userPost = express();
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "mydb"
});
var cus = {};
var bicycle ={};
var infor = {};
var branch = {};
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM bicycle", function (err, result, fields) {
        if (err) throw err;
        bicycle = result;
    });
});
//
router.get('/customer', function(req, res, next) {
    con.query("select name, id from customer", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
        cus = result;
    });
    res.send(cus);
});

router.get('/bicycle', function(req, res, next) {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM bicycle", function (err, result, fields) {
            if (err) throw err;
            bicycle = result;
        });
    });
    res.send(bicycle);
});

router.get('/branch', function(req, res, next) {
    con.query("SELECT * FROM branch", function (err, result, fields) {
        if (err) throw err;
        branch = result;
    });
    res.send(branch);
});

router.get('/infor', function (req, res, next) {
    con.query("SELECT b.name as bicycle, b2.name as branch, " +
        "c.name as customer FROM bicycle b join branch b2 on b.branch = b2.id join customer c on b.customer = c.id;", function (err, result, fields) {
        if (err) throw err;
        infor = result;
    });
    res.send(infor);
});
router.post('/insert-user', function (req, res) {
    console.log(req.body);
    const user = req.body;
    con.query("insert into customer (name, address) value (?, ?); ", [user.name, user.address],function (err, result, fields) {
        if (err) throw err;
    });
    res.send('aa');
});

router.post('/insert-bike', function (req, res) {
    console.log(req.body);
    const bike = req.body;
    con.query("insert into bicycle (name, branch, customer) value (?, ?, ?); ", [bike.name, bike.branch, bike.customer],function (err, result, fields) {
        if (err) throw err;
    });
    res.send('aa');
});
router.post('/insert-branch', function (req, res) {
    console.log(req.body);
    const branch = req.body;
    con.query("insert into branch (name) value (?); ", [branch.name],function (err, result, fields) {
        if (err) throw err;
    });
    res.send('aa');
});

module.exports = router;
