var HotTopic = require('../models/hotTopic');
var Article = require('../models/article');

var async = require('async');

exports.hot_topic_list_all = function (req, res, next) {

  HotTopic.find()
    .sort([['created_time', 'descending']])
    .limit(req.body.limit)
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


exports.hot_topic_create_post = function (req, res, next) {

  req.checkBody('name', 'name must be specified.').notEmpty();

  var errors = req.validationErrors();

  req.sanitize('created_time').toDate();

  if (errors) {
    res.send({ errors: errors });
    return;

  } else {
    var hot_topic = new HotTopic({
      name: req.body.name,
      created_time: req.body.created_time
    });

    hot_topic.save(function (err, newHotTopic) {
      if (err) { return callback(err); }
      res.send({ hot_topic: newHotTopic, success: 'Successfully' });
    });
  }

};

exports.hot_topic_update_post = function (req, res, next) {

  req.checkBody('name', 'name must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ errors: errors });
    return;

  } else {
    var hot_topic = {
      _id: req.body._id,
      name: req.body.name
    };

    HotTopic.findByIdAndUpdate(req.body._id, hot_topic, {}, function (err, newHotTopic) {
      if (err) { return next(err); }
      if (newHotTopic) {
        res.send({ hot_topic: newHotTopic, success: 'Successfully' });
      }

    });
  }

};

exports.hot_topic_delete_post = function (req, res, next) {
  
    req.checkBody('id', 'Id must be specified.').notEmpty();
  
    var errors = req.validationErrors();
  
    if (errors) {
      res.send({ error: errors });
    } else {
  
      async.parallel({
        hot_topic: function (callback) {
          HotTopic.findByIdAndRemove(req.body.id).exec(callback);
        },
        articles: function (callback) {
          Article.update({ hot_topic_id: req.body.id  }, { hot_topic_id: null}, { multi: true }, callback);
        },
      }, function (err, results) {
        if (err) { return next(err); }
        res.send({ category: results.category, success: 'Successfully' });
      });
  
  
    }
  
  };
