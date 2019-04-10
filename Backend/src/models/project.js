const user = require('./user');
const database = require('../database');

const list = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if(!loggedinUser){
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    })
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
      res.status(500);
      res.set({
        'Content-Type': 'application/json',
      })
      res.send(JSON.stringify(data));
      throw err;
    }
    const project={};
    project.own = result;

    database.query("SELECT `project`.* FROM `project` LEFT JOIN `contributors` ON `project`.`id`=`contributors`.`projectid` WHERE `contributors`.`userid`='" + loggedinUser.id + "';", (err, result, fields) => {
      if(err) {
        data.statusCode = 500;
        data.label = err.sqlMessage;
        res.status(500);
        res.set({
          'Content-Type': 'application/json',
        })
        res.send(JSON.stringify(data));
        throw err;
      }

      project.contributed = result;

      res.status(200);
      res.set({
        'Content-Type': 'application/json',
      })
      res.send(JSON.stringify(project));
    });
  });
}

const get = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if(!loggedinUser){
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    })
    res.send({
      statusCode: 403,
      label: "Forbidden.",
    });
    return;
  }

  const projectId = database.escape(req.params.id);
  database.query("SELECT `project`.* FROM `project` LEFT JOIN `contributors` ON `project`.`id`=`contributors`.`projectid` WHERE (`contributors`.`userid`='" + loggedinUser.id + "' OR `project`.`authorid`='" + loggedinUser.id + "') AND `project`.`id` = " + projectId + ";", (err, result, fields) => {
    if(err) {
      res.status(500);
      res.set({
        'Content-Type': 'application/json',
      })
      res.send(JSON.stringify({
        statusCode: 500,
        label: err.sqlMessage,
      }));
      throw err;
    }
    if(!result[0]) {
      res.status(200);
      res.set({
        'Content-Type': 'application/json',
      })
      res.send("{}");
      return;
    }
    const project = result[0];
    database.query("SELECT `widget`.* FROM `widget` WHERE `widget`.`projectid` = '"+project.id+"';", (err, result, fields) => {
      if(err) {
        res.status(500);
        res.set({
          'Content-Type': 'application/json',
        })
        res.send(JSON.stringify({
          statusCode: 500,
          label: err.sqlMessage,
        }));
        throw err;
      }
      project.widgets = result;
      res.status(200);
      res.set({
        'Content-Type': 'application/json',
      })
      res.send(JSON.stringify(project));
    })
  });
}

const del = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if(!loggedinUser){
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    })
    res.send({
      statusCode: 403,
      label: "Forbidden.",
    });
    return;
  }

  let data = {
    statusCode: 403,
    label: "Forbidden.",
  }
  const projectId = database.escape(req.params.id);
  database.asyncQuery("DELETE FROM `project` WHERE `authorid`='" + loggedinUser.id + "' AND `id` = " + projectId + ";")
    .then(result=>{
      if(result.affectedRows > 0) {
        data = {
          statusCode: 200,
          label: "Project delete was successful",
        };
        throw data;
      } else {
        return database.asyncQuery("DELETE FROM `contributors` WHERE `userid`='" + loggedinUser.id + "' AND `projectid`=" + projectId + ";");
      }
    })
    .then(result=>{
      if(result.affectedRows > 0) {
        data = {
          statusCode: 200,
          label: "Contribution delete was successful",
        }
      }
    })
    .then(()=>{
      res.status(data.statusCode);
      res.set({
        'Content-Type': 'application/json',
      })
      res.send(JSON.stringify(data));
    })
    .catch(err=>{
      if(err.sqlMessage) {
        err = {
          statusCode: 500,
          label: err.sqlMessage,
        }
      }
      res.status(err.statusCode);
      res.set({
        'Content-Type': 'application/json',
      })
      res.send(JSON.stringify(err));
    })
}

module.exports.list = list;
module.exports.get = get;
module.exports.delete = del;
