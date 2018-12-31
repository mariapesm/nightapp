//http://www.jonahnisenson.com/schema-within-a-schema-use-embedded-documents-in-mongoosemongo/
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var User = new Schema({
  socialId: { type: String },
  displayName: { type: String },
  photo: String
});

var Place = new Schema({
  placeId: { type: String, unique: true },
  user: [User]
});

module.exports = mongoose.model('places', Place);
