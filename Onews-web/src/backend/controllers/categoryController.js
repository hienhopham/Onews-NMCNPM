var Category = require('../models/category');

var async = require('async');

exports.category_list_by_level = function (req, res, next) {

  Category.find({ level: req.body.level })
    .sort([['name', 'ascending']])
    // .limit(req.params.limit)
    .exec(function (err, list_categories) {
      if (err) { return next(err); }
      res.send({ category_list: list_categories, success: 'Successfully' });
    });

};

exports.category_list_all = function (req, res, next) {

  Category.find()
    .exec(function (err, list_categories) {
      if (err) { return next(err); }
      res.send({ category_list: list_categories, success: 'Successfully' });
    });
};

exports.category_by_id = function (req, res, next) {

  Category.findById(req.body.id)
    .populate('parent_id')
    .exec(function (err, category) {
      if (err) { return next(err); }
      res.send({ category: category, success: 'Successfully' });
    });
};


exports.category_create_post = function (req, res, next) {

  req.checkBody('name', 'name must be specified.').notEmpty();
  req.checkBody('level', 'level must be specified.').notEmpty();

  var errors = req.validationErrors();

  req.sanitize('created_time').toDate();

  if (errors) {
    res.send({ errors: errors });
    return;

  } else {
    var category = new Category({
      name: req.body.name,
      level: req.body.level,
      parent_id: req.body.parent_id,
      created_time: req.body.created_time
    });

    category.save(function (err, newCategory) {
      if (err) { return callback(err); }
      res.send({ category: newCategory, success: 'Successfully' });
    });
  }

};

exports.category_update_post = function (req, res, next) {

  req.checkBody('name', 'name must be specified.').notEmpty();
  req.checkBody('level', 'level must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ errors: errors });
    return;

  } else {
    var category = {
      _id: req.body.id,
      name: req.body.name,
      parent_id: req.body.parent_id,
      level: req.body.level
    };

    Category.findByIdAndUpdate(req.body.id, category, {}, function (err, newCategory) {
      if (err) { return next(err); }
      if (newCategory) {
        res.send({ category: newCategory, success: 'Successfully' });
      }

    });
  }

};

exports.category_delete_post = function (req, res, next) {

  req.checkBody('id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ error: errors });
  } else {

    async.parallel({
      category: function (callback) {
        Category.findByIdAndRemove(req.body.id).exec(callback);
      },
      children_categorie: function (callback) {
        Category.find({ parent_id: req.body.id }).remove().exec(callback);
      },
    }, function (err, results) {
      if (err) { return next(err); }
      res.send({ category: results.category, success: 'Successfully' });
    });


  }

};