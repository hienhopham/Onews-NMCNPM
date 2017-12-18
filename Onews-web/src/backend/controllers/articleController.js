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
    .exec(function (err, article) {
      if (err) { return next(err); }
      res.send({ article: article, success: 'Successfully' });
    });
};