const mapKey = require('./config/keys').mapKey;
exports.getMapKey = mapKey;
// Making a static map is really long - this is a handy helper function to make one
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=11&size=800x150&key=${mapKey}&markers=${lat},${lng}&scale=4`;