var User = require('../models/user');

var async = require('async');

exports.user_detail_id = function (req, res) {

  User.findById(req.params.id)
    .exec(function (err, user) {
      if (err) { return next(err); }
      res.send({ user: user });
    });

};

exports.user_detail_username = function (req, res) {
  User.find({ username: req.params.username })
    .exec(function (err, user) {
      if (err) { return next(err); }
      res.send({ user: user });
    });

};

exports.user_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
};

exports.user_create_post = function (req, res) {
  req.checkBody('username', 'Username must be specified.').notEmpty();
  req.checkBody('full_name', 'Full name must be specified.').notEmpty();

  var user = new User(
    {
      username: req.body.username,
      full_name: req.body.full_name,
      email: req.body.email
    });

  if (req.body.type == 'f') {
    user.face_id = req.body.face_id;
  } else if (req.body.type == 'g') {
    user.google_id = req.body.google_id;
  } else {
    user.password = req.body.password;
  }

  var errors = req.validationErrors();

  if (errors) {
    res.send({ user: user, errors: errors });
    return;
  }
  else {
    var isExist = true;
    var response = {};

    async.series([

      function (callback) {
        User.find({ username: user.username })
          .exec(function (err, user) {
            if (err) { return callback(err); }
            isExist = user.length > 0 ? true : false;
            callback();
          });
      },

      function (callback) {
        if (!isExist) {
          user.save(function (err) {
            if (err) { return callback(err); }
            response.success = 'Successfully';
            callback();
          });
        } else {
          response.error = 'User already existed';
          callback();
        }
      }
    ], function (err) {
      if (err) return next(err);
      res.send(response);
    });


  }
};

