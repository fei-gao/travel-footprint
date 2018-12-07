const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/index');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const errorHandlers = require('./handlers/errorHandlers');
const helpers = require('./helpers');
require('./handlers/passport');

// create our express app
const app = express();

// Middleware
app.set('view engine', 'ejs');
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static('public'));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

// Apply a bunch of validation methods to every single request. Used heavily on userController.validateRegister
app.use(expressValidator());

// db config
const db = require('./config/keys').DATABASE;
// connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// connect-flash module depends on the express-session module
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.helpers = helpers;
  next();
});
// use routes
app.use('/', routes);

// if that above routes didn't work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// one of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

/* Development Error Handler - Prints stack trace */
app.use(errorHandlers.developmentErrors);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})