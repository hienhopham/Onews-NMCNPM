var Category = require('../models/category');

var async = require('async');

exports.category_list_by_level = function (req, res, next) {

  Category.find({level: req.body.level})
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