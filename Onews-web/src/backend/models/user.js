var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String},
  email: {type: String},
  full_name: {type: String, required: true},
  gender: {type: Number},
  date_of_birth: {type: Date},
  face_id: {type: String},
  google_id: {type: String},
  created_time: {type: Date},
  deleted: {type: Boolean}
});

BookSchema
  .virtual('url')
  .get(function () {
    return '/profile/' + this._id;
  });

module.exports = mongoose.model('Book', BookSchema);