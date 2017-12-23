var User = require('../models/user');
var Comment = require('../models/comment');

var async = require('async');

exports.user_detail_id_post = function (req, res) {

  req.checkBody('id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ error: errors });
  } else {

    User.findById(req.body.id)
      .exec(function (err, user) {
        if (err) { return next(err); }
        if (user) {
          res.send({ user: user, success: 'Successfully' });
        } else {
          res.send({ error: 'No such user' });
        }

      });
  }

};

exports.user_list = function (req, res, next) {
  User.find()
    .sort([['full_name', 'ascending']])
    .exec(function (err, list_users) {
      if (err) { return next(err); }
      res.send({ user_list: list_users, success: 'Successfully' });
    });

};

exports.user_detail_username_post = function (req, res) {
  User.find({ username: req.params.username })
    .exec(function (err, user) {
      if (err) { return next(err); }
      res.send({ user: user });
    });

};

exports.user_create_post = function (req, res) {
  req.checkBody('username', 'Username must be specified.').notEmpty();
  req.checkBody('full_name', 'Full name must be specified.').notEmpty();

  var errors = req.validationErrors();

  var user = new User(
    {
      username: req.body.username,
      full_name: req.body.full_name,
      email: req.body.email,
      password: null
    });

  if (req.body.date_of_birth && req.body.gender) {
    req.sanitize('date_of_birth').toDate();
    user.date_of_birth = req.body.date_of_birth;
    user.gender = req.body.gender;
  } else {
    user.date_of_birth = null;
    user.gender = null;
  }

  if (req.body.type == 'f') {
    user.face_id = req.body.face_id;
  } else if (req.body.type == 'g') {
    user.google_id = req.body.google_id;
  } else {
    user.password = req.body.password;
  }

  if (errors) {
    res.send({ user: user, errors: errors });
    return;

  } else {
    var isExist = true;
    var response = {};
    var currentUser = {};

    async.series([

      function (callback) {
        User.find({ username: user.username })
          .exec(function (err, foundUser) {
            if (err) { return callback(err); }
            currentUser = foundUser;
            isExist = foundUser.length > 0 ? true : false;
			console.log({ user: foundUser });
            callback();
          });
      },

      function (callback) {
        if (!isExist) {
          user.save(function (err, newUser) {
            if (err) { return callback(err); }
            response.success = 'Successfully';
            response.user = newUser;
            callback();
          });
        } else {
          response.user = currentUser;
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

exports.user_authenticate_post = function (req, res, next) {
  req.checkBody('username', 'username must be specified.').notEmpty();
  req.checkBody('password', 'password must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ error: errors });
  } else {
    User.find({ username: req.body.username, password: req.body.password })
      .exec(function (err, user) {
        if (err) { return next(err); }

        var isExist = user.length > 0 ? true : false;

        if (isExist) {
          res.send({ success: 'Successfully', user: user });
        } else {
          res.send({ error: 'Authentication failed' });
        }
      });
  }

};

exports.user_update_post = function (req, res, next) {

  req.checkBody('username', 'Username must be specified.').notEmpty();
  req.checkBody('full_name', 'Full name must be specified.').notEmpty();

  var errors = req.validationErrors();
  req.sanitize('date_of_birth').toDate();

  if (errors) {
    res.send({ errors: errors });
    return;

  } else {

    // User.findOneAndUpdate({ username: req.body.username }, user, {}, function(err, user) {
    //   if (err) { return next(err); }

    //   res.send({user: user, success: 'Successfully'});
    // })

    User.findOne({ username: req.body.username })
      .exec(function (err, found_user) {

        if (err) { return next(err); }

        if (found_user) {
          var user = new User(
            {
              username: req.body.username,
              full_name: req.body.full_name,
              email: req.body.email,
              date_of_birth: req.body.date_of_birth,
              gender: req.body.gender,
              _id: found_user.id
            });

          user.password = req.body.password ? req.body.password : found_user.password;

          User.findByIdAndUpdate(found_user.id, user, {}, function (err, newUser) {
            if (err) { return next(err); }
            res.send({ user: newUser, success: 'Successfully' });
          });
        }
        else {
          res.send({ error: 'User not found' });
        }

      });

  }

};

exports.user_delete_post = function (req, res, next) {

  req.checkBody('id', 'Id must be specified.').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.send({ error: errors });
  } else {
    async.parallel({
      user: function (callback) {
        User.findByIdAndRemove(req.body.id).exec(callback);
      },
      coments: function (callback) {
        Comment.find({ user_id: req.body.id }).remove().exec(callback);
      },
    }, function (err, results) {
      if (err) { return next(err); }
      res.send({ user: results.user, success: 'Successfully' });
    });
  }

};
