const fs  = require('fs');
const jwt = require('jsonwebtoken');

var privateKEY  = fs.readFileSync('./private.key', 'utf8');
var publicKEY  = fs.readFileSync('./public.key', 'utf8');

const sign = (payload, $Options) => {
  var signOptions = {
    issuer:  $Options.issuer,
    audience:  $Options.audience,
    expiresIn:  "10d",
    algorithm:  "RS256"
  };
  return jwt.sign(payload, privateKEY, signOptions);
};

const verify = (token, $Option) => {
  var verifyOptions = {
    issuer:  $Option.issuer,
    audience:  $Option.audience,
    expiresIn:  "10d",
    algorithm:  ["RS256"]
  };
  try {
    return jwt.verify(token, publicKEY, verifyOptions);
  } catch (err) {
    return false;
  }
};

const decode = (token) => {
  return jwt.decode(token, {complete: true});
};

module.exports.sign   = sign;
module.exports.verify = verify;
module.exports.decode = decode;
