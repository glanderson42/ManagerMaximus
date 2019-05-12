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
  };

  if (widget.id) {
    // Update existing widget
    widget.projectid = undefined;
    let modifiers =
      ((req.body.title     ) ? (' `title` = ' + database.escape(widget.title) + ',') : '') +
      ((req.body.data      ) ? (' `data` = ' + database.escape(widget.data) + ',') : '') +
      ((req.body.visibility) ? (' `visibility` = ' + database.escape(widget.visibility) + ',') : '') +
      '';
    modifiers = modifiers.substr(0, modifiers.length - 1);
    const sql = 'UPDATE `widget` SET' + modifiers + ' WHERE `authorid`=\'' + loggedinUser.id + '\' AND `id` = ' + database.escape(widget.id) + ';';
    database.asyncQuery(sql)
      .then(result => {
        if (result.affectedRows) {
          data = {
            statusCode: 200,
            label: 'Widget updated.',
          };
          console.log(`Widget #${widget.id} updated`);
        } else {
          data = {
            statusCode: 403,
            label: 'Forbidden.',
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

        const sql = 'INSERT INTO `widget` (`authorid`, `projectid`, `title`, `data`, `comments`, `visibility`) VALUES (\'' +
          loggedinUser.id + '\', ' +
          database.escape(widget.projectid) + ', ' +
          database.escape(widget.title) + ', ' +
          database.escape(widget.data) + ', ' +
          '\'[]\', ' +
          database.escape(widget.visibility) + ');';
        return database.asyncQuery(sql);
      })
      .then(result => {
        if (result.insertId) {
          console.log(`New widget created #${result.insertId}`);
          data = {
            statusCode: 200,
            label: 'New widget created.',
            projectid: result.insertId,
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
  }
};

module.exports.delete = del;
module.exports.put = put;
