var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String },
  email: { type: String },
  full_name: { type: String, required: true },
  gender: { type: Number },
  date_of_birth: { type: Date },
  face_id: { type: String },
  google_id: { type: String },
  created_time: { type: Date },
  deleted: { type: Boolean }
},
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

UserSchema
  .virtual('url')
  .get(function () {
    return '/#/admin/manage/user/' + this._id;
  });
module.exports = mongoose.model('User', UserSchema);