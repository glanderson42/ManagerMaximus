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
  }, (error, info)=>{
    if(error){
      console.log(error)
    }
    callback(error, info);
  });
};

module.exports.init = init
module.exports.sendMail = sendMail
