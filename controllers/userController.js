const mongoose = require('mongoose');
const User = require('../models/User');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login Form' });
}

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register Form' });
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That email is not valid!').notEmpty().isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match.').equals(req.body.password);

  const errors = req.validationErrors(); // do the above check
  // here we handle errors itself instead of passing down to middleware
  if (errors) {
    req.flash('danger', errors.map(err => err.msg));
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return; // stop the fn from running
  }
  next(); // there were no errors!
}