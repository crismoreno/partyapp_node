const indexModel = require("../models/index");
var url = require('url');

var controller = {
  index: function (req, res){
    res.render('index', {title: 'PartyApp'})
  },
  sendContactForm: function (req, res) {
    indexModel.storeMessage(req.con, req.body, function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/?success=true");

      }
    })
  }
}

module.exports = controller;