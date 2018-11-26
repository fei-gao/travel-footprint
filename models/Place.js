const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },
  description: {
    type: String,
    trim: true
  },
  // tags: [String],
  // created: {
  //   type: Date,
  //   default: Date.now
  // },
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point'
  //   },
  //   coordinates: [{
  //     type: Number,
  //     required: 'You must supply coordinates!'
  //   }],
  //   address: {
  //     type: String,
  //     required: 'You must supply an address!'
  //   }
  // }
});

// placeSchema.pre('save', function (next) {
//   if (!this.isModified('name')) {
//     next(); // skip it
//     return; // stop this function from running
//   }
//   next();
// })
module.exports = mongoose.model('Place', placeSchema);