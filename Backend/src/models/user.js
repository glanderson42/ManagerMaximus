const database = require('../database');

const getUsersTable = (req, res) => {
  database.query("SELECT * FROM users", (err, result, fields) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
}

module.exports.getUsersTable = getUsersTable;
