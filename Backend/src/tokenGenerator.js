const fs  = require('fs');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const database = require('./database');

var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');

const token2hash = token => {
  const hash = md5(token);
  try {
    const q = database.asyncQuery("INSERT INTO `tokens` (`hash`, `token`) VALUES ('"+hash+"', '"+token+"')");
  } catch {}
  return hash;
};

const hash2token = hash => {
  try {
    const q = database.asyncQuery("SELECT `token` FROM `tokens` WHERE `hash`='"+hash+"'");
    return q[0].token;
  } catch {
    return "";
  }
};

const sign = (payload, $Options) => {
  var signOptions = {
    issuer:  $Options.issuer,
    audience:  $Options.audience,
    expiresIn:  "10d",
    algorithm:  "RS256"
  };
  const token = jwt.sign(payload, privateKEY, signOptions);
  return token2hash(token);
};

const verify = (hash, $Option) => {
  var verifyOptions = {
    issuer:  $Option.issuer,
    audience:  $Option.audience,
    expiresIn:  "10d",
    algorithm:  ["RS256"]
  };
  try {
    return jwt.verify(hash2token(hash), publicKEY, verifyOptions);
  } catch (err) {
    return false;
  }
};

const decode = (hash) => {
  return jwt.decode(hash2token(hash), {complete: true});
};

module.exports.sign   = sign;
module.exports.verify = verify;
module.exports.decode = decode;
module.exports.token2hash = token2hash;
module.exports.hash2token = hash2token;
