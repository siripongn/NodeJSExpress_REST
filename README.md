"# NodeJSExpress_REST" 

npm init
npm install express --save

node index.js

GET
localhost:8888
localhost:8888/index
localhost:8888/user
localhost:8888/user/3

npm install body-parser --save
var bodyParser = require('body-parser');
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


POST
localhost:8888/newuser
