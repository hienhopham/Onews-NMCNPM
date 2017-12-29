var Comment = require('../models/comment');

var async = require('async');

exports.comment_all = function (req, res, next) {

  Comment.find()
    .populate('article_id')
    .populate('user_id')
    .sort([['created_time', 'descending']])
    // .limit(req.body.limit)
    .exec(function (err, list_comments) {
      if (err) { return next(err); }
      res.send({ comment_list: list_comments, success: 'Successfully' });
    });
}

exports.comment_create = function (req, res, next) {
  req.checkBody('user_id', 'User_id must be specified.').notEmpty();
  req.checkBody('article_id', 'Article_id name must be specified.').notEmpty();

  req.sanitize('created_time').toDate();

  var errors = req.validationErrors();

  var comment = new Comment(
    {
      user_id: req.body.user_id,
      article_id: req.body.article_id,
      content: req.body.content,
      created_time: req.body.created_time
    });

  if (errors) {
    res.send({ error: errors });
    return;
  }
  else {
    comment.save(function (err, comment) {
      if (err) { return next(err); }
      Comment.populate(comment, { path: "user_id" }, function (err, added_comment) {
        res.send({ comment: added_comment, success: 'Successfully' });
      });

    });

  }
}

exports.comment_by_article = function (req, res, next) {

  Comment.find({ article_id: req.body.article_id })
    .populate('user_id')
    .sort([['created_time', 'descending']])
    // .limit(req.body.limit)
    .exec(function (err, list_comments) {
      if (err) { return next(err); }
      res.send({ comment_list: list_comments, success: 'Successfully' });
    });
}
exports.comment_count_by_article = function (req, res, next) {

  req.checkBody('article_id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ error: errors });
    return;
  } else {
    Comment.count({ article_id: req.body.article_id })
      .exec(function (err, number_of_comments) {
        if (err) { return next(err); }
        res.send({ number_of_comments: number_of_comments, success: 'Successfully' });
      });
  }
}

exports.comment_by_id = function (req, res, next) {
  req.checkBody('id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ error: errors });
    return;
  } else {
    Comment.findById(req.body.id)
      .populate('article_id')
      .populate('user_id')
      .exec(function (err, comment) {
        if (err) { return next(err); }
        res.send({ comment: comment, success: 'Successfully' });
      });
  }

}

exports.comment_update_post = function (req, res, next) {
  req.checkBody('content', 'Content must be specified.').notEmpty();
  req.checkBody('id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  var comment = new Comment(
    {
      _id: req.body.id,
      content: req.body.content
    });

  if (errors) {
    res.send({ comment: comment, errors: errors });
    return;

  } else {

    Comment.findByIdAndUpdate(req.body.id, comment, {}, function (err, newComment) {
      if (err) { return next(err); }
      if (newComment) {
        res.send({ comment: newComment, success: 'Successfully' });
      }

    });
  }

};

exports.comment_delete_post = function (req, res, next) {

  req.checkBody('id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ error: errors });
  } else {

    Comment.findByIdAndRemove(req.body.id).exec(function (err, comment) {
      if (err) { return next(err); }
      res.send({ comment: comment, success: 'Successfully' });
    });


  }

};