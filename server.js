const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

// Middleware
app.set('view engine', 'ejs');
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// create application/json parser
app.use(bodyParser.json());

// db config
const db = require('./config/keys').DATABASE;
// connect to mongodb
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// use routes
app.use('/', routes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`)
})