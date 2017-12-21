var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  article_id: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
  content: { type: String },
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

CommentSchema
  .virtual('created_time_string')
  .get(function () {
    return moment(this.created_time).format('h:mm:ss DD/MM/YYYY');
  });

module.exports = mongoose.model('Comment', CommentSchema);