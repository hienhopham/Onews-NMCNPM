var HotTopic = require('../models/hotTopic');

var async = require('async');

exports.hot_topic_list_all = function (req, res, next) {

  HotTopic.find()
    .exec(function (err, list_hot_topics) {
      if (err) { return next(err); }
      res.send({ hot_topic_list: list_hot_topics, success: 'Successfully' });
    });
};

exports.hot_topic_by_id = function (req, res, next) {

  HotTopic.findById(req.body.id)
    .exec(function (err, hot_topic) {
      if (err) { return next(err); }
      if (hot_topic) {
        res.send({ hot_topic: hot_topic, success: 'Successfully' });
      } else {
        res.send({ error: 'No such hot topic' });
      }
    });
};
