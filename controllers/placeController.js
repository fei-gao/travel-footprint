const mongoose = require('mongoose');
const Place = require('../models/Place');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false)
    }
  }
}

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

// let multer handle a single field called photo
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
  }
  console.log(req.file);
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