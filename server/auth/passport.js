const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    messages = require('../common/messages'),
    allcode = require('../const/errdef/allcode'),
    User = require('../model').User;

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        var lang = req.session.lang;
        var user = await User.findOne({ $or: [{ email: email }, { username: req.body.username }] });
        if (user) {
            if (user.email === email) {
                return done(null, false, messages.getMessageByLang(allcode.EMAIL_TAKEN, lang));
            };
            if (user.username === req.body.username) {
                return done(null, false, messages.getMessageByLang(allcode.USERNAME_TAKEN, lang));
            };
            return done(null, false);
        } else {
            var newUser = new User();
            newUser.email = email;
            newUser.username = req.body.username;
            newUser.password = newUser.generateHashPassword(password);
            newUser.stream_key = newUser.generateStreamKey();
            await newUser.save();
            return done(null, newUser);
        }
    } catch (error) {
        return done(error);
    };
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, async (req, email, password, done) => {
    try {
        var lang = req.session.lang;
        var user = await User.findOne({
            email: email,
        });

        if (user) {
            if (!user.validPassword(password)) {
                return done(null, false, messages.getMessageByLang(allcode.PASSWORD_INVALID, lang));
            }
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error);
    };
}));

module.exports = passport;

