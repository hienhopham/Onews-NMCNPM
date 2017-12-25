var mongoose = require('mongoose');
var Article = require('../models/article');
var Category = require('../models/category');
var Comment = require('../models/comment');

var fs = require('fs');
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

        category_id_list.push({category_id: req.body.category_id});
        category_list.forEach(function (category) {
          category_id_list.push({ category_id: category.id });
        });
        conditions = { "$or": category_id_list };
      }

      Article.find(conditions)
        .sort([['created_time', 'descending']])
        .populate('category_id')
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
    .populate('hot_topic_id')
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

exports.article_create_post = function (req, res, next) {
  req.checkBody('title', 'Title must be specified.').notEmpty();
  req.checkBody('img', 'Image must be specified.').notEmpty();
  req.checkBody('category_id', 'Category must be specified.').notEmpty();
  req.checkBody('content', 'Content must be specified.').notEmpty();

  var errors = req.validationErrors();
  req.sanitize('created_time').toDate();

  var article = new Article(
    {
      title: req.body.title,
      img: req.body.img,
      category_id: req.body.category_id,
      content: req.body.content,
      created_time: req.body.created_time,
      author: req.body.author,
      hot_topic_id: req.body.hot_topic_id
    });
    console.log(article);

  if (errors) {
    res.send({ article: article, errors: errors });
    return;

  } else {

    article.save(function (err, newArticle) {
      if (err) { return next(err); }
      res.send({ article: newArticle, success: 'Successfully' });
    });
  }

};

exports.article_upload_file = function (req, res, next) {
  if (req.files) {
    var file = req.files.file;

    fs.readFile(req.files.file.path, function (err, data) {
      file.path = process.cwd() + "/dist/images/articles/" + file.name;

      fs.writeFile(file.path, data, function (err) {
        if (err) {
          return console.warn(err);
        }
        console.log("The file: " + file.name + " was saved to " + file.path);
        res.send({ success: "The file: " + file.name + " was saved to " + file.path });
      });
    });
  }

}

exports.article_update_post = function (req, res, next) {
  req.checkBody('title', 'Title must be specified.').notEmpty();
  req.checkBody('img', 'Image must be specified.').notEmpty();
  req.checkBody('category_id', 'Category must be specified.').notEmpty();
  req.checkBody('content', 'Content must be specified.').notEmpty();

  var errors = req.validationErrors();
  req.sanitize('created_time').toDate();

  var article = new Article(
    {
      _id: req.body.id,
      title: req.body.title,
      img: req.body.img,
      category_id: req.body.category_id,
      content: req.body.content,
      author: req.body.author,
      hot_topic_id: req.body.hot_topic_id
    });

  if (errors) {
    res.send({ article: article, errors: errors });
    return;

  } else {

    Article.findByIdAndUpdate(req.body.id, article, {}, function (err, newArticle) {
      if (err) { return next(err); }
      if (newArticle) {
        res.send({ article: newArticle, success: 'Successfully' });
      }

    });
  }

};

exports.article_delete_post = function (req, res, next) {
  req.checkBody('id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ errors: errors });
    return;

  } else {

    async.parallel({
      article: function (callback) {
        Article.findByIdAndRemove(req.body.id).exec(callback);
      },
      comments: function (callback) {
        Comment.find({ article_id: req.body.id }).remove().exec(callback);
      },
    }, function (err, results) {
      if (err) { return next(err); }
      res.send({ article: results.article, success: 'Successfully' });
    });

  }

};