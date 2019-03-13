const express = require('express');
const database = require('./database');
const user = require('./models/user');
const bodyParser = require('body-parser');
const smtp = require('./smtp');
const config = require('config');

const app = express();
const port = config.get('port');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

database.init();

smtp.init();

app.get('/', user.getUsersTable);
app.post('/login', user.login);
app.post('/registration', user.registration);

app.listen(port, () => console.log(`Application listening on port ${port}!`));
