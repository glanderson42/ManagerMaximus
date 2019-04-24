const md5 = require('md5');
const database = require('./database');

const sign = (payloadIn, $Options) => {
  const now = new Date();
  const issuer = database.escape($Options.issuer || '');
  const audience = database.escape($Options.audience || '');
  const payload = database.escape(JSON.stringify(payloadIn || '{}'));
  const starts = database.escape(now.toISOString().slice(0, 19).replace('T', ' '));
  now.setDate(now.getDate() + 10);
  const expires = database.escape(now.toISOString().slice(0, 19).replace('T', ' '));
  const token = md5(issuer+audience+starts+expires);

  const sql = 'INSERT INTO `tokens` (`token`, `issuer`, `audience`, `payload`, `starts`, `expires`) VALUES (\''+token+'\', '+issuer+', '+audience+', '+payload+', '+starts+', '+expires+')';

  database.query(sql, (err) => {
    if(err) {
      throw err;
    }
  });

  return token;
};

const verify = (token, $Options) => {
  const now = new Date();
  const issuer = $Options.issuer || '';
  const audience = $Options.audience || '';

  try {
    const q = database.syncQuery('SELECT `issuer`, `audience`, `payload`, `starts`, `expires` FROM `tokens` WHERE `token`=\''+token+'\'');
    if(q[0]){
      let correct = true;
      correct = correct && (q[0].issuer === issuer);
      correct = correct && (q[0].audience === audience);
      correct = correct && (q[0].starts <= now);
      correct = correct && (q[0].expires >= now);
      if(correct) {
        return JSON.parse(q[0].payload || '{}');
      } else {
        return '';
      }
    } else {
      return '';
    }
  } catch(error) {
    return '';
  }
};

/*const decode = (hash) => {
  return jwt.decode(hash2token(hash), {complete: true});
};*/

module.exports.sign   = sign;
module.exports.verify = verify;
//module.exports.decode = decode;
