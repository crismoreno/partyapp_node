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
          service: 'Gmail',
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

        var mailtoCris = {
          from: name,
          to: mail,
          subject: `New Message at PartyApp from ${name}`,
          text: `
          Name: ${name}
          Comming: ${comming}
          Pizza: ${pizza}
          Message: ${message}`
        }

        var mailtoHost = {
          from: mail,
          to: email,
          subject: `Are you ready for the party?`,
          text: `
          Hello dear person interested in this project,
          I noticed you sent me a contact form through the PartyApp Platform.

          Note that the data submitted was:
          Name: ${name}
          Comming: ${comming}
          Pizza: ${pizza}
          Message: ${message}

          Not bad aha?!

          Thank you for your interest and time taken to test this feature :)
          In case you want to have further information about me or want to reach me out for future collabs or job opportunities, I'm just a click away!

          I hope you have a wonderful day, don't hesitate to check my personal website at: https://www.notcalpi.me
          `
        }

        transporter.sendMail(mailtoCris, (err, data) => {
          if (err) {
            callback(err, null);
          } else {
            transporter.sendMail(mailtoHost, (err, data) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, res);
              }
            })
          }
        })
      }
    });
  }
}


