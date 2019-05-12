const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const database = require('./database');
const user = require('./models/user');
const project = require('./models/project');
const widget = require('./models/widget');
const bodyParser = require('body-parser');
const smtp = require('./smtp');
const config = require('config');
// const tokenGenerator = require('./tokenGenerator');

const app = express();
const port = config.get('port');
const portSSL = config.get('portSSL');

let hasCertificate = false;
let privateKey;
let certificate;
let ca;
let credentials;

try {
  privateKey = fs.readFileSync(config.get('privKey'), 'utf8');
  certificate = fs.readFileSync(config.get('cert'), 'utf8');
  ca = fs.readFileSync(config.get('chain'), 'utf8');

  credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca,
  };
  hasCertificate = true;
} catch (error) {
  // hasCertificate false
}

app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true,
}));
app.use(bodyParser.json({
  limit: '10mb',
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

if (config.get('requestLog')) {
  console.log('REQUEST: logging enabled' + (config.get('requestLogDetailed') ? ' [DETAILED]' : ''));
  app.use((req, res, next) => {
    console.log('REQUEST: ' + new Date().toLocaleString() + '\t' + req.method + '\t' + req.headers.host + '\t' + req.url);
    if (config.get('requestLogDetailed')) {
      console.log('  Auth: ' + req.headers.authorization);
      console.log('  U-ag: ' + req.headers['user-agent']);
    }
    next();
  });
}
if (parseInt(config.get('timestampLogMinutes'), 10)) {
  console.log('TIMESTAMP: ' + new Date().toLocaleString() + '\t' + parseInt(config.get('timestampLogMinutes'), 10) + 'min');
  setInterval(() => {
    console.log('TIMESTAMP: ' + new Date().toLocaleString());
  }, 1000 * 60 * parseInt(config.get('timestampLogMinutes'), 10));
}

database.init();

smtp.init();

app.get('/', user.getUsersTable);
app.get('/confirm/:token', user.confirm);
app.get('/projects/list', project.list);
app.get('/projects/:id', project.get);
app.get('/projects/:id/user/list', project.userList);
app.get('/logout', user.logout);

app.post('/login', user.login);
app.post('/registration', user.registration);

app.delete('/projects/:id', project.delete);
app.delete('/projects/:id/user/:userid', project.userDelete);
app.delete('/widget/:id', widget.delete);

app.put('/projects', project.put);
app.put('/projects/:id/user/:userid', project.userAdd);
app.put('/widget', widget.put);

// Starting both http & https servers
const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log('HTTP Server running on port ' + port);
});

if (hasCertificate) {
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(portSSL, () => {
    console.log('HTTPS Server running on port ' + portSSL);
  });
} else {
  console.log('HTTPS Server not started');
}
