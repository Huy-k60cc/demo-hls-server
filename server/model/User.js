const Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    shortid = require('shortid');

var User = new Schema({
    username: String,
    email: String,
    password: String,
    stream_key: String,
});

User.methods.generateHashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

User.methods.generateStreamKey = function () {
    return shortid.generate();
};
module.exports = User;

