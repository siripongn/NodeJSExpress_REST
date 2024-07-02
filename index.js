var Express = require('express')();
var users = require('./users');
var bodyParser = require('body-parser');
// var MySQL2 = require('mysql2');
// var CORS = require('cors');

///// port 8888 
var port = process.env.PORT || 8888;

/////Routing
Express.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});
Express.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});
Express.get('/user', function (req, res) {
    res.json(users.findAll());
});
Express.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});

// parse Expresslication/json
Express.use(bodyParser.json());
Express.use(bodyParser.urlencoded({
    extended: true
}));
Express.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});


// var con = MySQL2.createConnection({
//     host: "localhost",
//     user: "myuser",
//     password: "test#pass"
//     port: 3306
//     database: "myDB"
//   });
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// Express.use(cors())
// Express.use(express.json())
// Express.get('/usernames', function (req, res, next) {
//     connection.query(
//         'SELECT * FROM `users`',
//         function(err, results, fields) {
//         res.json(results);
//         }
//     );
// })
// Express.get('/usernames/:id', function (req, res, next) {
//     const id = req.params.id;
//     connection.query(
//         'SELECT * FROM `users` WHERE `id` = ?',
//         [id],
//         function(err, results) {
//         res.json(results);
//         }
//     );
// })

// Express.post('/usernames', function (req, res, next) {
//     connection.query(
//         'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
//         [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
//         function(err, results) {
//         res.json(results);
//         }
//     );
// })


// Express.put('/usernames', function (req, res, next) {
//     connection.query(
//         'UPDATE `users` SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `avatar`= ? WHERE id = ?',
//         [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
//         function(err, results) {
//         res.json(results);
//         }
//     );
// })

// Express.delete('/users', function (req, res, next) {
//     connection.query(
//         'DELETE FROM `users` WHERE id = ?',
//         [req.body.id],
//         function(err, results) {
//         res.json(results);
//         }
//     );
// })

/////Run server port8888
Express.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});