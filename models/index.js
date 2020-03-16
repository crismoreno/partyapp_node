var nodemailer = require('nodemailer');
require('dotenv').config()

module.exports = {
  storeMessage: function(con, data, callback){
    var name = data.name;
    var email = data.email;
    var comming = data.comming;
    var pizza = data.pizza;
    var formated_pizza = data.pizza.replace("'", "/");
    var formated_message = data.message.replace("'", "/");
    var message = data.message;


    console.log('formated_message', formated_message)

    con.query(`INSERT INTO contact_form VALUES (NULL, '${name}', '${email}', '${formated_message}', '${comming}', '${formated_pizza}')`, function(err, res){
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

        var mail = {
          from: name,
          to: mail,
          subject: `New Message at PartyApp from ${name}`,
          text: `
          Name: ${name}
          Comming: ${comming}
          Pizza: ${pizza}
          Message: ${message}`
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


