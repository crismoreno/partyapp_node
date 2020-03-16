var nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = {
  storeMessage: function(con, data, callback){
    con.query(`INSERT INTO contact_form VALUES (NULL, '${data.name}', '${data.email}', '${data.message}', '${data.comming}', '${data.pizza}')`, function(err, res){
    var mail = process.env.MAIL;
    var pwd = process.env.MAILPWD;
      if (err) {
        callback(err, null);
      }else{
        var transport = {
          // service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: mail,
            pass: pwd
          }
        }
        var transporter = nodemailer.createTransport(transport);
        transporter.verify((error, success) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Server is ready to take messages');
          }
        });

        var name = data.name
        var email = data.email
        var tel = data.tel
        var message = data.message

        var mail = {
          from: name,
          to: mail,
          subject: 'New Message from Contact Form',
          text: message, email, tel
        }

        transporter.sendMail(mail, (err, data) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, res);
          }
        })
      }
    });
  }
}


