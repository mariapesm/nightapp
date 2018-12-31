import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var User = new Schema({
  socialId: { type: String, unique: true },
  displayName: { type: String },
  photo: String
});

module.exports = mongoose.model('users', User);
