const mysql = require('mysql');
const config = require('config');
const util = require('util');
const sp = require('synchronized-promise');

let connection;

const init = () => {
  connection = mysql.createConnection(config.get('database'));

  connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to DB!');
  });

  return connection;
};

const query = (query, callback) => {
  connection.query(query, callback);
};

const syncQuery = query => {
  const q = sp(util.promisify(connection.query).bind(connection));
  return q(query);
};

const asyncQuery = query => {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        return reject( err );
      }
      resolve( rows );
      return null;
    });
  });
};

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

module.exports.init = init;
module.exports.query = query;
module.exports.escape = mysql.escape;
module.exports.validateEmail = validateEmail;
module.exports.syncQuery = syncQuery;
module.exports.asyncQuery = asyncQuery;
