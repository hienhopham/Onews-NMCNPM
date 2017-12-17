var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  article_id: {type: Schema.Types.ObjectId, ref: 'Article'},
  content: { type: String},
  created_time: {type: Date},
  deleted: {type: Boolean}
});

module.exports = mongoose.model('Comment', CommentSchema);