const mysql = require('mysql');
const config = require('config');

let connection;

const init = () => {
  connection = mysql.createConnection(config.get('database'));

  connection.connect(function(err) {
    if(err) {
      throw err;
    }
    console.log("Connected to DB!");
  });

  return connection;
}

const hasinit = () => {
  console.log(!!connection);
}

const query = (query, callback)=>{
  connection.query(query, callback);
};

const validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports.init = init
module.exports.hasinit = hasinit
module.exports.query = query
module.exports.escape = mysql.escape
module.exports.validateEmail = validateEmail
