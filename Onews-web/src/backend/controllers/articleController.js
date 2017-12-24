var mongoose = require('mongoose');
var Article = require('../models/article');
var Category = require('../models/category');

var async = require('async');

exports.article_list_by_category = function (req, res, next) {

  var category_list = [];
  var response = {};

  async.series([

    function (callback) {
      Category.find({ parent_id: req.body.category_id })
        .exec(function (err, list_categories) {
          if (err) { return callback(err); }
          category_list = list_categories;
          callback();
        });
    },
    function (callback) {
      var conditions = { category_id: req.body.category_id };

      if (category_list.length > 0) {
        var category_id_list = [];

        category_list.forEach(function (category) {
          category_id_list.push({ category_id: category.id });
        });
        conditions = { "$or": category_id_list };
      }

      Article.find(conditions)
        .sort([['created_time', 'descending']])
        .limit(req.body.limit)
        .exec(function (err, list_articles) {
          if (err) { return callback(err); }
          response.success = 'Successfully';
          response.article_list = list_articles;
          callback();
        });

    }

  ], function (err) {
    if (err) return next(err);
    res.send(response);
  });

};

exports.article_list_by_hot_topic = function (req, res, next) {

  var response = {};

  Article.find({ hot_topic_id: req.body.hot_topic_id })
    .sort([['created_time', 'descending']])
    // .limit(req.body.limit)
    .exec(function (err, list_articles) {
      if (err) { return callback(err); }
      response.success = 'Successfully';
      response.article_list = list_articles;
      res.send(response);
    });

};

exports.article_list_by_time_order = function (req, res, next) {

  var response = {};

  Article.find()
    .sort([['created_time', 'descending']])
    .limit(req.body.limit)
    .exec(function (err, list_articles) {
      if (err) { return callback(err); }
      response.success = 'Successfully';
      response.article_list = list_articles;
      res.send(response);
    });

}


exports.article_by_id = function (req, res, next) {

  Article.findById(req.body.id)
    .populate('category_id')
    .exec(function (err, article) {
      if (err) { return next(err); }
      if (article) {
        res.send({ article: article, success: 'Successfully' });
      } else {
        res.send({ error: 'No such article' });
      }
    });
};

exports.articles_by_serch_key = function (req, res, next) {

  var searchKey = '/' + req.body.searchKey + '/i';

  Article.find({ $or: [{ content: new RegExp(req.body.searchKey, 'i') }, { title: new RegExp(req.body.searchKey, 'i') }] })
    .populate('category_id')
    // .limit(req.body.limit)
    .sort([['created_time', 'descending']])
    .exec(function (err, found_articles) {
      if (err) { return next(err); }
      if (found_articles.length) {
        res.send({ found_articles: found_articles, success: 'Successfully' });
      } else {
        res.send({ error: 'No such articles' });
      }
    });
};