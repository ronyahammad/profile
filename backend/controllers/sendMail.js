const nodemailer = require('nodemailer')

const {EMAIL_FROM,PASSWORD,EMAIL_SERVICE}=process.env

const sendEmail=(from,to,subject,html)=>{

    const transporter= nodemailer.createTransport({
        host:EMAIL_SERVICE,
        auth:{
          user:EMAIL_FROM,
          pass:PASSWORD
        },
    })
    const mailOptions={
        from:from,
        to: to,
        subject: subject,
        html: html
      };
      transporter.sendMail(mailOptions,(err,infor)=>{
        if(err) return err;
        return infor
      })
    
}
module.exports = sendEmail