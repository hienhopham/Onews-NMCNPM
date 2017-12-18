var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {type: String, required: true},
  level: {type: Number},
  parent_id: { type: Schema.ObjectId, ref: 'Category'},
  deleted: {type: Boolean}
},
{
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});

CategorySchema
  .virtual('url')
  .get(function () {
    return '/#/category/' + this._id;
  });

module.exports = mongoose.model('Category', CategorySchema);