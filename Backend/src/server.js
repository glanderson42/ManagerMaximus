const express = require('express');
const database = require('./database');
const user = require('./models/user');
var bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

database.init("127.0.0.1","manager_maximus","3Pi14159265","manager_maximus");

app.get('/', user.getUsersTable);
app.post('/login', user.login);
app.post('/registration', user.registration);

app.listen(port, () => console.log(`Application listening on port ${port}!`));
