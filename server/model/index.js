const Mongoose = require('mongoose');

var User = require('./User');

module.exports.User = Mongoose.model('User', User);