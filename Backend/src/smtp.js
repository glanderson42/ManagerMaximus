const nodemailer = require('nodemailer');

let transporter;

const init = (host, port, secure, user, password)=>{
  transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: password
    }
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.error(error);
    } else {
      console.log("SMTP connected.");
    }
  });
}

const sendMail = (to, subject, text, callback)=>{
  transporter.sendMail({
    from: 'ManagerMaximus <managermaximus@heatnet.hu>',
    to: to,
    subject: subject,
    text: text.replace(/<.+?>/g, ''),
    html: text
  }, callback);
};

module.exports.init = init
module.exports.sendMail = sendMail
