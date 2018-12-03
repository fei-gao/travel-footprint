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
  req.flash('success', `Successfully created ${place.name}. Care to leave a review?`)
  res.redirect(`/places/${place._id}/edit`);
}

// GET
exports.editPlace = async (req, res) => {
  const place = await Place.findOne({ _id: req.params.id });
  res.render('editPlace', { title: `Edit ${place.name}`, place });
}

// POST
exports.updatePlace = async (req, res) => {
  // Find and update the place
  const place = await Place.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new place instead of the old one
    runValidators: true
  }).exec();

  req.flash('success', `Successfully updated ${place.name}. Well done!`)
  // redirect them to places home page
  res.redirect(`/places/${place._id}/edit`);
}