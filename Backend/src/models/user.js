const database = require('../database');
var md5 = require('md5');

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

  let username = req.body.username;
  let password = md5(req.body.password);

  database.query("SELECT * FROM `users` WHERE (`username`='"+username+"' OR `email`='"+username+"') AND `password`='"+password+"' AND `status`!='REMOVED'", (err, result, fields) => {
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
      }
    }
    res.send(JSON.stringify(data));
  });
}

module.exports.getUsersTable = getUsersTable;
module.exports.login = login;
