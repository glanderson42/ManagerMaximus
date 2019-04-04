const nodemailer = require('nodemailer');
const config = require('config');

let transporter;
const transporterList = [];
let transportsCount = 0;

const init = () => {
  config.get('smtpList').forEach((smtpConfig, index)=>{
    const currentTransporter = nodemailer.createTransport(smtpConfig);
    currentTransporter.verify(function(error, success) {
      if (error) {
        console.error(`SMTP_List item #${index} cannot connect`);
      } else {
        console.log(`SMTP_List item #${index} connected`);
        transporterList.push(currentTransporter);
      }
    });
  })

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
  let currentTransporter;
  if (transporterList.length === 0) {
    currentTransporter = transporter;
  } else {
    currentTransporter = transporterList[transportsCount%transporterList.length];
    transportsCount++;
  }

  currentTransporter.sendMail({
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
