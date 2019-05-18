const user = require('./user');
const database = require('../database');

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
  database.asyncQuery('DELETE FROM `widget` WHERE `authorid`=\'' + loggedinUser.id + '\' AND `id` = ' + projectId + ';')
    .then(result => {
      if (result.affectedRows > 0) {
        data = {
          statusCode: 200,
          label: 'Widget delete was successful',
        };
        console.log(`Widget #${projectId} deleted`);
        throw data;
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
    statusCode: 403,
    label: 'Forbidden.',
  };

  const widget = {
    id: req.body.id || null,
    projectid: req.body.projectid || null,

    title: req.body.title || null,
    data: req.body.data || null,
    visibility: req.body.visibility || null, // 'PUBLIC', 'OWN', 'HIDDEN', 'REMOVED'
    type: req.body.type || '',
  };

  if (widget.id) {
    // Update existing widget
    widget.projectid = undefined;
    let modifiers =
      ((req.body.title     ) ? (' `title` = ' + database.escape(widget.title) + ',') : '') +
      ((req.body.data      ) ? (' `data` = ' + database.escape(widget.data) + ',') : '') +
      ((req.body.visibility) ? (' `visibility` = ' + database.escape(widget.visibility) + ',') : '') +
      ((req.body.type      ) ? (' `type` = ' + database.escape(widget.type) + ',') : '') +
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
    const sql = 'UPDATE `widget` SET' + modifiers + ' WHERE `authorid`=\'' + loggedinUser.id + '\' AND `id` = ' + database.escape(widget.id) + ';';
    database.asyncQuery(sql)
      .then(result => {
        if (result.affectedRows) {
          console.log(`Widget #${widget.id} updated`);
          return database.asyncQuery('SELECT * FROM `widget` WHERE `id`=' + widget.id + ';');
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
          data.label = 'Widget updated.';
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
    // Create new widget
    database.asyncQuery('SELECT `project`.* FROM `project` LEFT JOIN `contributors` ON `project`.`id`=`contributors`.`projectid` WHERE (`contributors`.`userid`=\'' + loggedinUser.id + '\' OR `project`.`authorid`=\'' + loggedinUser.id + '\') AND `project`.`id`=' + database.escape(widget.projectid) + ';')
      .then(result => {
        if (result.length === 0 && widget.parentid && widget.parentid !== 'NULL') {
          throw {
            statusCode: 403,
            label: 'Cannot make widget for this project.',
          };
        }
        widget.parentid = parseInt(widget.parentid, 10);

        const sql = 'INSERT INTO `widget` (`authorid`, `projectid`, `title`, `type`, `data`, `comments`, `visibility`) VALUES (\'' +
          loggedinUser.id + '\', ' +
          database.escape(widget.projectid) + ', ' +
          database.escape(widget.title) + ', ' +
          database.escape(widget.type) + ', ' +
          database.escape(widget.data) + ', ' +
          '\'[]\', ' +
          database.escape(widget.visibility) + ');';
        return database.asyncQuery(sql);
      })
      .then(result => {
        if (result.insertId) {
          console.log(`New widget created #${result.insertId}`);
          return database.asyncQuery('SELECT * FROM `widget` WHERE `id`=' + result.insertId + ';');
        }
        throw data;
      })
      .then(result => {
        if (result.length > 0) {
          data = result[0];
          data.statusCode = 200;
          data.label = 'New widget created.';
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

module.exports.delete = del;
module.exports.put = put;
