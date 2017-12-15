var User = require('../models/user');

exports.user_detail_id = function (req, res) {

  User.findById(req.params.id)
    .exec(function (err, user) {
      if (err) { return next(err); }
      res.send({ user: user });
    });

};

exports.user_detail_username = function (req, res) {
  User.find({username: req.params.username})
    .exec(function (err, user) {
      if (err) { return next(err); }
      res.send({ user: user });
    });

};

exports.user_create_get = function (req, res) {
  res.send('NOT IMPLEMENTED: Book create GET');
};

exports.user_create_post = function (req, res) {
  req.checkBody('username', 'Username must be specified.').notEmpty(); //We won't force Alphanumeric, because people might have spaces.
  req.checkBody('full_name', 'Full name must be specified.').notEmpty();

  if (req.body.type == 'f') {
    var user = new User(
      {
        username: req.body.username,
        full_name: req.body.full_name,
        email: req.body.email,
        face_id: req.body.face_id
      });
  }

  var errors = req.validationErrors();

  if (errors) {
    res.send({ user: user, errors: errors });
    return;
  }
  else {
    user.save(function (err) {
      if (err) { return next(err); }
      res.send({ success: 'Create user successfully' })
    });

  }
};

