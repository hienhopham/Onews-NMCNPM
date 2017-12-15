//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/Onews';

mongoose.connect(mongoDB, {
  useMongoClient: true
});
mongoose.Promise = global.Promise;

var connection = mongoose.connection;

module.exports = connection;

