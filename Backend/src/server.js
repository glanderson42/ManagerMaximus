const express = require('express');
const database = require('./database');
const user = require('./models/user');
const project = require('./models/project');
const bodyParser = require('body-parser');
const smtp = require('./smtp');
const config = require('config');
const tokenGenerator = require('./tokenGenerator');

const app = express();
const port = config.get('port');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
});

database.init();

smtp.init();

app.get('/', user.getUsersTable);
app.get('/confirm/:token', user.confirm);
app.get('/projects/list', project.list);
app.get('/projects/:id', project.get);

app.post('/login', user.login);
app.post('/registration', user.registration);

app.delete('/projects/:id', project.delete);

app.listen(port, () => console.log(`Application listening on port ${port}!`));
