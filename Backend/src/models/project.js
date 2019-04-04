const user = require('./user');
const database = require('../database');

const list = (req, res) => {
  res.set({
    'Content-Type': 'application/json',
  })
  const loggedinUser = user.getLoggedInUser(req);
  if(!loggedinUser){
    res.send({
      statusCode: 403,
      label: "Forbidden.",
    });
    return;
  }

  database.query("SELECT * FROM `project` WHERE authorid='" + loggedinUser.id + "' AND `parentid` IS NULL;", (err, result, fields) => {
    if(err) {
      data.statusCode = 500;
      data.label = err.sqlMessage;
      res.send(JSON.stringify(data));
      throw err;
    }
    const project={};
    project.own = result;

    database.query("SELECT `project`.* FROM `project` LEFT JOIN `contributors` ON `project`.`id`=`contributors`.`projectid` WHERE `contributors`.`userid`='" + loggedinUser.id + "';", (err, result, fields) => {
      if(err) {
        data.statusCode = 500;
        data.label = err.sqlMessage;
        res.send(JSON.stringify(data));
        throw err;
      }

      project.contributed = result;

      res.send(JSON.stringify(project));
    });
  });
}

module.exports.list = list;
