const express = require('express');
const database = require('./database');
const user = require('./models/user');

const app = express();
const port = 3000;

database.init("127.0.0.1","manager_maximus","3Pi14159265","manager_maximus");

app.get('/', user.getUsersTable);

app.listen(port, () => console.log(`Application listening on port ${port}!`));
