const user = require('./user');
const database = require('../database');

const list = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if (!loggedinUser) {
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send({
      statusCode: 403,
      label: 'Forbidden.',
    });
    return;
  }

  const data = {
    statusCode: 403,
    label: 'Forbidden.',
  };
  database.query('SELECT * FROM `project` WHERE authorid=\'' + loggedinUser.id + '\' AND `parentid` IS NULL;', (err, result) => {
    if (err) {
      data.statusCode = 500;
      data.label = err.sqlMessage;
      res.status(500);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(data));
      throw err;
    }
    const project = {};
    project.own = result;

    database.query('SELECT `project`.* FROM `project` LEFT JOIN `contributors` ON `project`.`id`=`contributors`.`projectid` WHERE `contributors`.`userid`=\'' + loggedinUser.id + '\';', (err, result) => {
      if (err) {
        data.statusCode = 500;
        data.label = err.sqlMessage;
        res.status(500);
        res.set({
          'Content-Type': 'application/json',
        });
        res.send(JSON.stringify(data));
        throw err;
      }

      project.contributed = result;

      res.status(200);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(project));
    });
  });
};

const get = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if (!loggedinUser) {
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send({
      statusCode: 403,
      label: 'Forbidden.',
    });
    return;
  }

  let data = {
    statusCode: 403,
    label: 'Forbidden.',
  };
  const projectId = database.escape(req.params.id);
  database.asyncQuery('SELECT `project`.* FROM `project` LEFT JOIN `contributors` ON `project`.`id`=`contributors`.`projectid` WHERE (`contributors`.`userid`=\'' + loggedinUser.id + '\' OR `project`.`authorid`=\'' + loggedinUser.id + '\') AND `project`.`id` = ' + projectId + ';')
    .then(result => {
      if (!result[0]) {
        throw {
          statusCode: 405,
          label: 'Forbidden.',
        };
      }
      data = result[0];
      return database.asyncQuery('SELECT `widget`.* FROM `widget` WHERE `widget`.`projectid` = \'' + data.id + '\';');
    })
    .then((result) => {
      data.widgets = result;
      return database.asyncQuery('SELECT `id`, `title` FROM `project` WHERE `parentid`=\'' + data.id + '\';');
    })
    .then((result) => {
      data.subprojects = result;
    })
    .then(() => {
      res.status(data.statusCode || 200);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      if (err.sqlMessage) {
        err = {
          statusCode: 500,
          label: err.sqlMessage,
        };
      }
      res.status(err.statusCode);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(err));
    });
};

const del = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if (!loggedinUser) {
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send({
      statusCode: 403,
      label: 'Forbidden.',
    });
    return;
  }

  let data = {
    statusCode: 403,
    label: 'Forbidden.',
  };
  const projectId = database.escape(req.params.id);
  database.asyncQuery('DELETE FROM `project` WHERE `authorid`=\'' + loggedinUser.id + '\' AND `id` = ' + projectId + ';')
    .then(result => {
      if (result.affectedRows > 0) {
        data = {
          statusCode: 200,
          label: 'Project delete was successful',
        };
        console.log(`Project #${projectId} deleted`);
        throw data;
      } else {
        return database.asyncQuery('DELETE FROM `contributors` WHERE `userid`=\'' + loggedinUser.id + '\' AND `projectid`=' + projectId + ';');
      }
    })
    .then(result => {
      if (result.affectedRows > 0) {
        data = {
          statusCode: 200,
          label: 'Contribution delete was successful',
        };
      }
    })
    .then(() => {
      res.status(data.statusCode);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      if (err.sqlMessage) {
        err = {
          statusCode: 500,
          label: err.sqlMessage,
        };
      }
      res.status(err.statusCode);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(err));
    });
};

const put = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if (!loggedinUser) {
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send({
      statusCode: 403,
      label: 'Forbidden.',
    });
    return;
  }

  let data = {
    statusCode: 500,
    label: 'Unknown error.',
  };

  const project = {
    id: req.body.id || '',
    parentid: req.body.parentid || '',

    title: req.body.title || '',
    description: req.body.description || '',
    deadline: req.body.deadline || 'NULL',
    category: req.body.category || 'NEW',
    priority: req.body.priority || '',
    headerimage: req.body.headerimage || '',
  };

  if (project.id) {
    // Update existing project
    project.parentid = undefined;
    let modifiers =
      ((req.body.title      ) ? (' `title` = ' +       database.escape(project.title)       + ',') : '') +
      ((req.body.description) ? (' `description` = ' + database.escape(project.description) + ',') : '') +
      ((req.body.deadline   ) ? (' `deadline` = ' +    ((project.deadline === 'NULL') ? 'NULL' : database.escape(project.deadline))    + ',') : '') +
      ((req.body.category   ) ? (' `category` = ' +    database.escape(project.category)    + ',') : '') +
      ((req.body.priority   ) ? (' `priority` = ' +    database.escape(project.priority)    + ',') : '') +
      ((req.body.headerimage) ? (' `headerimage` = ' + database.escape(project.headerimage) + ',') : '') +
      '';
    if (modifiers === '') {
      res.status(204);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify({
        statusCode: 204,
        label: 'Data not changed.',
      }));
      return;
    }
    modifiers = modifiers.substr(0, modifiers.length - 1);
    const sql = 'UPDATE `project` SET' + modifiers + ' WHERE `authorid`=\'' + loggedinUser.id + '\' AND `id` = ' + database.escape(project.id) + ';';
    database.asyncQuery(sql)
      .then(result => {
        if (result.affectedRows) {
          console.log(`Project #${project.id} updated`);
          return database.asyncQuery('SELECT * FROM `project` WHERE `id`=' + project.id + ';');
        }
        throw {
          statusCode: 403,
          label: 'Forbidden.',
        };
      })
      .then(result => {
        if (result.length > 0) {
          data = result[0];
          data.statusCode = 200;
          data.label = 'Project updated.';
        }
      })
      .then(() => {
        res.status(data.statusCode);
        res.set({
          'Content-Type': 'application/json',
        });
        res.send(JSON.stringify(data));
      })
      .catch(err => {
        if (err.sqlMessage) {
          err = {
            statusCode: 500,
            label: err.sqlMessage,
          };
        }
        res.status(err.statusCode);
        res.set({
          'Content-Type': 'application/json',
        });
        res.send(JSON.stringify(err));
      });
  } else {
    // Create new project
    database.asyncQuery('SELECT `id` FROM `project` WHERE `authorid`=\'' + loggedinUser.id + '\' AND `id` = ' + database.escape(project.parentid) + ';')
      .then(result => {
        if (result.length === 0 && project.parentid && project.parentid !== 'NULL') {
          throw {
            statusCode: 403,
            label: 'Cannot make subproject for contributed project.',
          };
        }
        project.parentid = parseInt(project.parentid, 10);
        const sql = 'INSERT INTO `project` (`authorid`, `parentid`, `title`, `description`, `deadline`, `category`, `headerimage`, `priority`) VALUES ' +
          '(\'' + loggedinUser.id + '\', ' +
          ((isNaN(project.parentid)) ? 'NULL' : project.parentid) + ', ' +
          database.escape(project.title) + ', ' +
          database.escape(project.description) + ', ' +
          ((project.deadline === 'NULL') ? 'NULL' : database.escape(project.deadline)) + ', ' +
          database.escape(project.category) + ', ' +
          database.escape(project.headerimage) + ', ' +
          database.escape(project.priority) + ');';
        return database.asyncQuery(sql);
      })
      .then(result => {
        if (result.insertId) {
          console.log(`New project created #${result.insertId}`);
          return database.asyncQuery('SELECT * FROM `project` WHERE `id`=' + result.insertId + ';');
        }
        throw {
          statusCode: 403,
          label: 'Forbidden.',
        };
      })
      .then(result => {
        if (result.length > 0) {
          data = result[0];
          data.statusCode = 200;
          data.label = 'New project created.';
          data.projectid = data.id;
        }
      })
      .then(() => {
        res.status(data.statusCode);
        res.set({
          'Content-Type': 'application/json',
        });
        res.send(JSON.stringify(data));
      })
      .catch(err => {
        if (err.sqlMessage) {
          err = {
            statusCode: 500,
            label: err.sqlMessage,
          };
        }
        res.status(err.statusCode);
        res.set({
          'Content-Type': 'application/json',
        });
        res.send(JSON.stringify(err));
      });
  }
};

const userList = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if (!loggedinUser) {
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send({
      statusCode: 403,
      label: 'Forbidden.',
    });
    return;
  }

  const projectId = database.escape(req.params.id);
  let data = {
    statusCode: 403,
    label: 'Forbidden.',
  };
  database.asyncQuery('SELECT * FROM `project` WHERE authorid=\'' + loggedinUser.id + '\' AND `id`=' + projectId)
    .then(result => {
      if (result.length === 0) {
        throw data;
      }
      return database.asyncQuery('SELECT `users`.`id`, `users`.`username`, `users`.`email` FROM `contributors` LEFT JOIN `users` ON `contributors`.`userid`=`users`.`id` WHERE `contributors`.`projectid`=' + projectId + ';');
    })
    .then((result) => {
      data = result;
    })
    .then(() => {
      res.status(data.statusCode || 200);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      if (err.sqlMessage) {
        err = {
          statusCode: 500,
          label: err.sqlMessage,
        };
      }
      res.status(err.statusCode);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(err));
    });
};

const userDelete = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if (!loggedinUser) {
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send({
      statusCode: 403,
      label: 'Forbidden.',
    });
    return;
  }

  const projectId = database.escape(req.params.id);
  const userId = database.escape(req.params.userid);
  let data = {
    statusCode: 403,
    label: 'Forbidden.',
  };
  database.asyncQuery('SELECT * FROM `project` WHERE authorid=\'' + loggedinUser.id + '\' AND `id`=' + projectId)
    .then(result => {
      if (result.length === 0) {
        throw data;
      }
      return database.asyncQuery('DELETE FROM `contributors` WHERE `userid`=' + userId + ' AND `projectid`=' + projectId + ';');
    })
    .then((result) => {
      if (result.affectedRows > 0) {
        console.log(`User ${userId} removed from project ${projectId}`);
        data = {
          statusCode: 200,
          label: 'User removed from project.',
        };
      } else {
        data = {
          statusCode: 200,
          label: 'This user does not contributing this project.',
        };
      }
    })
    .then(() => {
      res.status(data.statusCode || 200);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      if (err.sqlMessage) {
        err = {
          statusCode: 500,
          label: err.sqlMessage,
        };
      }
      res.status(err.statusCode);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(err));
    });
};

const userAdd = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if (!loggedinUser) {
    res.status(403);
    res.set({
      'Content-Type': 'application/json',
    });
    res.send({
      statusCode: 403,
      label: 'Forbidden.',
    });
    return;
  }

  const projectId = database.escape(req.params.id);
  const userId = database.escape(req.params.userid);
  let data = {
    statusCode: 403,
    label: 'Forbidden.',
  };
  let newUser;
  database.asyncQuery('SELECT `id` FROM `project` WHERE authorid=\'' + loggedinUser.id + '\' AND `id`=' + projectId)
    .then(result => {
      if (result.length === 0) {
        throw data;
      }
      return database.asyncQuery('SELECT `id`, `name` FROM `users` WHERE `id`=' + userId + ' OR `username`=' + userId + ' OR `email`=' + userId + ';');
    })
    .then((result) => {
      if (result.length <= 0) {
        throw {
          statusCode: 403,
          label: 'There is no user like ' + userId + '.',
        };
      }
      newUser = result[0];
      return database.asyncQuery('SELECT `id` FROM `contributors` WHERE `userid`=' + newUser.id + ' AND `projectid`=' + projectId + ';');
    })
    .then((result) => {
      if (result.length > 0) {
        throw {
          statusCode: 403,
          label: 'This user already contributes this project.',
        };
      }
      data = result;
      return database.asyncQuery('INSERT INTO `contributors` (`userid`, `projectid`) VALUES (' + newUser.id + ', ' + projectId + ');');
    })
    .then((result) => {
      if (result.affectedRows > 0) {
        console.log(`User ${newUser.id} contributes ${projectId}`);
        data = {
          statusCode: 200,
          label: newUser.name + ' set as a contributor.',
        };
      } else {
        throw {
          statusCode: 500,
          label: 'Unknown error.',
        };
      }
    })
    .then(() => {
      res.status(data.statusCode || 200);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(data));
    })
    .catch(err => {
      if (err.sqlMessage) {
        err = {
          statusCode: 500,
          label: err.sqlMessage,
        };
      }
      res.status(err.statusCode);
      res.set({
        'Content-Type': 'application/json',
      });
      res.send(JSON.stringify(err));
    });
};

module.exports.list = list;
module.exports.get = get;
module.exports.delete = del;
module.exports.put = put;
module.exports.userList = userList;
module.exports.userDelete = userDelete;
module.exports.userAdd = userAdd;
