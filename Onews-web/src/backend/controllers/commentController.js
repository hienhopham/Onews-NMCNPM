var Comment = require('../models/comment');

var async = require('async');

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
      Comment.populate(comment, {path:"user_id"}, function(err, added_comment) {
        res.send({ comment: added_comment, success: 'Successfully'});
      });
      
    });

  }
}

exports.comment_by_article = function (req, res, next) {

  Comment.find({ article_id: req.body.article_id })
  .sort([['created_time', 'descending']])
  // .limit(req.body.limit)
  .exec(function (err, list_comments) {
    if (err) { return next(err); }
    res.send({comment_list: list_comments, success: 'Successfully'});
  });
}