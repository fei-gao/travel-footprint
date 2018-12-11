const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a place name!'
  },
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!'
    }],
    address: {
      type: String,
      required: 'You must supply an address!'
    }
  },
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  }
});

// placeSchema.pre('save', function (next) {
//   if (!this.isModified('name')) {
//     next(); // skip it
//     return; // stop this function from running
//   }
//   next();
// })

placeSchema.statics.getTagsList = function () {
  return this.aggregate([
    // make each tag corresponding to one place
    { $unwind: '$tags' },
    // each time we group one place based on tag field, add by 1
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    // sort tags in descending order
    { $sort: { count: -1 } }
  ]);
}
module.exports = mongoose.model('Place', placeSchema);
