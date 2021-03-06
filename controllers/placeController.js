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

// GET single place
exports.getPlaceById = async (req, res, next) => {
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) { // see if id is a valid ObjectId or not
    return next();
  }
  const place = await Place.findById(id).populate('author');
  if (!place) { // place is null if cannot find that id from db
    return next();
  }
  res.render('showPlace', { place, title: place.name });
}

// GET
exports.addPlace = (req, res) => {
  res.render('createPlace.ejs')
}

// let multer handle a single field called photo
exports.upload = multer(multerOptions).single('photo');
// save the resized photo to uploads folder
exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
}
// POST
exports.createPlace = async (req, res) => {
  req.body.author = req.user._id;
  const place = await (new Place(req.body)).save();
  req.flash('success', `Successfully created ${place.name}. Care to leave a review?`)
  res.redirect(`/places/${place._id}/edit`);
}

const confirmOwner = (place, user) => {
  if (!place.author.equals(user._id)) {
    throw Error('You are not author of this post. Wanna create your own?')
  }
}
// GET
exports.editPlace = async (req, res, next) => {
  // 1. Find the place given the ID
  const id = req.params.id;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) { // see if id is a valid ObjectId or not
    return next();
  } const place = await Place.findById(id);
  if (!place) { // place is null if cannot find that id from db
    return next();
  }
  // 2. confirm they are the owner of the place
  confirmOwner(place, req.user);
  // 3. Render out the edit form so the user can update their place
  res.render('editPlace', { title: `Edit ${place.name}`, place });
}

// POST
exports.updatePlace = async (req, res) => {
  // Find and update the place
  const place = await Place.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new place instead of the old one
    runValidators: true
  }).exec();

  req.flash('success', `Successfully updated ${place.name}. Well done!`);
  // redirect them to places home page
  res.redirect(`/places/${place._id}/edit`);
}

exports.getPlacesByTag = async (req, res) => {
  const selectedTag = req.params.tag;
  // gives all places with tags included if user not select any tag
  const tagQuery = selectedTag || { $exists: true };
  const tagsPromise = Place.getTagsList();
  const placesPromise = Place.find({ tags: tagQuery });
  const [tags, places] = await Promise.all([tagsPromise, placesPromise]);
  res.render('tag', { tags, places, selectedTag, title: 'Tags' });
}