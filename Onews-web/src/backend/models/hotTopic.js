var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var hotTopicSchema = new Schema({
  name: {type: String, required: true},
  created_time: {type: Date},
  deleted: {type: Boolean}
});

module.exports = mongoose.model('HotTopic', hotTopicSchema);