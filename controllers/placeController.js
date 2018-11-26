const mongoose = require('mongoose');
const Place = require('../models/Place');

exports.homePage = (req, res) => {
  res.render('index');
}

exports.addPlace = (req, res) => {
  res.render('place_form.ejs')
}