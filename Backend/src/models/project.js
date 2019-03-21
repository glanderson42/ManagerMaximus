const user = require('./user');

const list = (req, res) => {
  const loggedinUser = user.getLoggedInUser(req);
  if(!loggedinUser){
    res.send({
      statusCode: 403,
      label: "Forbidden.",
    });
    return;
  }
  
  res.send({
    statusCode: 200,
    label: "Ok.",
  });
}

module.exports.list = list;
