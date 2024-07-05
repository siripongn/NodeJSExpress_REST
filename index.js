var Express = require('express')();
var usernames = require('./users');
var bodyParser = require('body-parser');
var MySQL2 = require('mysql2');
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
Express.get('/username', function (req, res) {
    res.json(usernames.findAll());
});
Express.get('/username/:id', function (req, res) {
    var id = req.params.id;
    res.json(usernames.findById(id));
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

var dbConn = MySQL2.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql#pass",
    port: 3306,
    waitForConnections: true,
    debug: false,
    database: "todos"
});
dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Retrieve all quote
Express.get('/quotes', function (req, res) {
    dbConn.query('SELECT * FROM quote', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'quote list.' });
    });
});
// Retrieve quote with id 
Express.get('/quote/:id', function (req, res) {
 
    let quote_id = req.params.id;
 
    if (!quote_id) {
        return res.status(400).send({ error: true, message: 'Please provide quote_id' });
    }
 
    dbConn.query('SELECT * FROM quote where id=?', quote_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'quote list.' });
    });
 
});
// Add a new quote  
Express.post('/quote', function (req, res) {
 
    let quote = req.body.quote;
 
    if (!quote) {
        return res.status(400).send({ error:true, message: 'Please provide quote' });
    }
 
    dbConn.query("INSERT INTO quote SET ? ", { quote: quote }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
//  Update quote with id
Express.put('/quote', function (req, res) {
 
    let quote_id = req.body.quote_id;
    let quote = req.body.quote;
 
    if (!quote_id || !quote) {
        return res.status(400).send({ error: quote, message: 'Please provide quote and quote_id' });
    }
 
    dbConn.query("UPDATE quote SET quote = ? WHERE id = ?", [quote, quote_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'quote has been updated successfully.' });
    });
});
//  Delete quote
Express.delete('/quote', function (req, res) {
 
    let quote_id = req.body.quote_id;
 
    if (!quote_id) {
        return res.status(400).send({ error: true, message: 'Please provide quote_id' });
    }
    dbConn.query('DELETE FROM quote WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'Quote has been updated successfully.' });
    });
}); 


// Retrieve all users 
Express.get('/users', function (req, res) {
    dbConn.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'users list.' });
    });
});
// Retrieve user with id 
Express.get('/user/:id', function (req, res) {
 
    let user_id = req.params.id;
 
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
 
    dbConn.query('SELECT * FROM users where id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'users list.' });
    });
 
});
// Add a new user  
Express.post('/user', function (req, res) {
 
    let user = req.body.user;
 
    if (!user) {
        return res.status(400).send({ error:true, message: 'Please provide user' });
    }
 
    dbConn.query("INSERT INTO users SET ? ", { user: user }, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New user has been created successfully.' });
    });
});
//  Update user with id
Express.put('/user', function (req, res) {
 
    let user_id = req.body.user_id;
    let user = req.body.user;
 
    if (!user_id || !user) {
        return res.status(400).send({ error: user, message: 'Please provide user and user_id' });
    }
 
    dbConn.query("UPDATE users SET user = ? WHERE id = ?", [user, user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});
//  Delete user
Express.delete('/user', function (req, res) {
 
    let user_id = req.body.user_id;
 
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide user_id' });
    }
    dbConn.query('DELETE FROM users WHERE id = ?', [user_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'User has been updated successfully.' });
    });
}); 
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