const database = require('../database');
const md5 = require('md5');
const smtp = require('../smtp');
const config = require('config');
const tokenGenerator = require('../tokenGenerator');

const getUsersTable = (req, res) => {
  database.query("SELECT * FROM users", (err, result, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
}

const login = (req, res) => {
  res.set({
    'Content-Type': 'application/json',
  })

  const username = req.body.username || '';
  const password = md5(req.body.password);

  database.query("SELECT * FROM `users` WHERE (`username`="+database.escape(username)+" OR `email`="+database.escape(username)+") AND `password`='"+password+"' AND `status`!='REMOVED'", (err, result, fields) => {
    let data = {
      statusCode: 403,
      label: "Incorrect username or password.",
    }
    if(err) {
      data.statusCode = 500;
      data.label = err.sqlMessage;
      res.send(JSON.stringify(data));
      throw err;
    }
    if(result[0]){
      result[0].password = undefined;

      if(result[0].status === 'NEW') {
        data.statusCode = 403;
        data.label = "E-mail address not confirmed.";
      } else if(result[0].status === 'DISABLED') {
        data.statusCode = 403;
        data.label = "User account is disabled.";
      } else {
        data = result[0];
        data.statusCode = 200;
        data.label = 'Logged in successfully.'
        data.token = 'TODO';
        console.log(`User '${username}' logged in`);
      }
    }
    res.send(JSON.stringify(data));
  });
}

const registration = (req, res) => {
  res.set({
    'Content-Type': 'application/json',
  })

  const username = req.body.username || '';
  const password = req.body.password || '';
  const password2 = req.body.password2 || '';
  const email = req.body.email || '';
  const name = req.body.name || '';

  let data = {
    statusCode: 200,
    label: "Registration was successful.",
  }

  if(username === '') {       data.statusCode=403; data.label="Username is empty."; }
  else if(password === '') {  data.statusCode=403; data.label="Password is empty."; }
  else if(password2 === '') { data.statusCode=403; data.label="Password2 is empty."; }
  else if(email === '') {     data.statusCode=403; data.label="Email is empty."; }
  else if(name === '') {      data.statusCode=403; data.label="Name is empty."; }
  else if(!database.validateEmail(email)) { data.statusCode=403; data.label="Email is not valid."; }
  else if(password !== password2) {         data.statusCode=403; data.label="Password and password2 is different."; }

  if(data.statusCode !== 200){
    res.send(JSON.stringify(data));
    return;
  }

  database.query("SELECT * FROM `users` WHERE `username`="+database.escape(username), (err, result, fields) => {
    if(err) {
      data.statusCode = 500;
      data.label = err.sqlMessage;
      res.send(JSON.stringify(data));
      throw err;
    }
    if(result.length > 0) {
      data.statusCode = 403;
      data.label="This username is taken.";
      res.send(JSON.stringify(data));
      return;
    }
    database.query("SELECT * FROM `users` WHERE `email`="+database.escape(email), (err, result, fields) => {
      if(err) {
        data.statusCode = 500;
        data.label = err.sqlMessage;
        res.send(JSON.stringify(data));
        throw err;
      }
      if(result.length > 0) {
        data.statusCode = 403;
        data.label="This email is already registrated.";
        res.send(JSON.stringify(data));
        return;
      }

      const query = "INSERT INTO `users` (`username`, `password`, `email`, `name`) VALUES ("+database.escape(username)+", '"+md5(password)+"', "+database.escape(email)+", "+database.escape(name)+")";
      database.query(query, (err, result, fields) => {
        if(err) {
          data.statusCode = 500;
          data.label = err.sqlMessage;
          res.send(JSON.stringify(data));
          throw err;
        }
        console.log(`New user '${username}' registrated`);

        const token = tokenGenerator.sign({
          userid: result.insertId
        }, {
          issuer: "Confirm",
          audience: ""
        });
        const tokenURL = config.get('hostUrl') + ":" + config.get('port') + "/confirm/" + token;
        smtp.sendMail(email, 'Confirm your e-mail address', `Dear ${name}!<br><br>Welcome on ManagerMaximus.<br><a href="${tokenURL}">Click here</a> to confirm your e-mail address, or open this link:<br><a href="${tokenURL}">${tokenURL}</a>`, (error, info)=>{});

        res.send(JSON.stringify(data));
      });
    });
  });
}

const confirm = (req, res) => {
  const token = req.params.token;
  res.status(302);

  const tokenData = tokenGenerator.verify(token, {
    issuer: "Confirm",
    audience: ""
  });

  if(tokenData) {
    database.query("UPDATE users SET `status`='CONFIRMED' WHERE `status`='NEW' AND `id`="+database.escape(tokenData.userid), (err, result, fields) => {
      if(err || result.affectedRows==0) {
        res.set({
          'Location': config.get('frontendUrl')+'emailconfirm/error',
        })
        res.send("ERROR");
      } else {
        res.set({
          'Location': config.get('frontendUrl')+'emailconfirm/success',
        })
        res.send("SUCCESS");
      }
      if(err) {
        throw err;
      }
    });
  } else {
    res.set({
      'Location': config.get('frontendUrl')+'emailconfirm/wrongtoken',
    })
    res.send("WRONG TOKEN");
  }
}

module.exports.getUsersTable = getUsersTable;
module.exports.login = login;
module.exports.registration = registration;
module.exports.confirm = confirm;
