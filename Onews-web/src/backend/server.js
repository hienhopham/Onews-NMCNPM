var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var connection = require('./dbConnection');
var user = require('./routes/user');
var article = require('./routes/article');
var category = require('./routes/category');
var hotTopic = require('./routes/hotTopic');
var comment = require('./routes/comment');
  
var app = express();

connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator() );
app.use(cookieParser());

app.get('/', function (req, res) {
  res.sendfile('index.html');
});
app.use('/user', user);
app.use('/article', article);
app.use('/category', category);
app.use('/hottopic', hotTopic);
app.use('/comment', comment);
  
var server = app.listen(8585, function() {
  console.log('Server listening on port ' + server.address().port);
});
module.exports = app;