var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  content: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  category_id: { type: Schema.ObjectId, ref: 'Category' },
  author: { type: String },
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

ArticleSchema
  .virtual('url')
  .get(function () {
    return '/article/' + this._id;
  });

ArticleSchema
  .virtual('created_time_string')
  .get(function () {
    return moment(this.created_time).format('h:mm:ss DD/MM/YYYY');
  });

module.exports = mongoose.model('Article', ArticleSchema);