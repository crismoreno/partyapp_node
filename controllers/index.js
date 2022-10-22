const {guests} = require('../public/data')
const indexModel = require("../models/index");
var url = require('url');

var controller = {
  index: function (req, res){
    if (url.parse(req.url, true).query) {
      var query = url.parse(req.url, true).query;
    } else {
      var query = false;
    }
    res.render('index', {title: 'PartyApp', query: query.success, guests})
  },
  sendContactForm: function (req, res) {
    indexModel.storeMessage(req.con, req.body, function (err, _result) {
      if (err) {
        res.send(err);
      } else {
        res.redirect("/?success=true");

      }
    })
  }
}

module.exports = controller;