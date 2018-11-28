const mongoose = require('mongoose');
const Place = require('../models/Place');

exports.homePage = async (req, res) => {
  const places = await Place.find();
  res.render('places', { title: 'Places', places });
}

exports.getPlaces = async (req, res) => {
  // query the database for a list of all places
  const places = await Place.find();
  res.render('places', { title: 'Places', places });
}

// GET
exports.addPlace = (req, res) => {
  res.render('createPlace.ejs')
}

// POST
exports.createPlace = async (req, res) => {
  const place = await (new Place(req.body)).save();
  res.redirect('/places');
}

// GET
exports.editPlace = async (req, res) => {
  const place = await Place.findOne({ _id: req.params.id });
  res.render('editPlace', { title: `Edit ${place.name}`, place });
}

// POST
exports.updatePlace = async (req, res) => {
  // Set the location data to be a point
  // req.body.location.type = 'Point';
  // Find and update the place
  const place = await Place.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new place instead of the old one
    runValidators: true
  }).exec();
  // redirect them to places home page
  res.redirect("/places");
}