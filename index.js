var app = require('express')();
var users = require('./users');
var bodyParser = require('body-parser');

///// port 8888 
var port = process.env.PORT || 8888;

/////Routing
app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1>');
});
app.get('/index', function (req, res) {
    res.send('<h1>This is index page</h1>');
});
app.get('/user', function (req, res) {
    res.json(users.findAll());
});
app.get('/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.post('/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});


/////Run server port8888
app.listen(port, function() {
    console.log('Starting node.js on port ' + port);
});