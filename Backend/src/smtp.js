const nodemailer = require('nodemailer');
const config = require('config');

let transporter;

const init = () => {
  transporter = nodemailer.createTransport(config.get('smtp'));
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
    from: `${config.get('projectName')} <${config.get('projectEmail')}>`,
    to: to,
    subject: subject,
    text: text.replace(/<.+?>/g, ''),
    html: text
  }, callback);
};

module.exports.init = init
module.exports.sendMail = sendMail
