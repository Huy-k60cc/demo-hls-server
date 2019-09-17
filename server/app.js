const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    session = require('express-session'),
    sessionFileStore = require('session-file-store')(session),
    passport = require('./auth/passport'),
    config = require('./config'),
    port = config.server.port,
    app = express();
mongoose.connect('mongodb://127.0.0.1/live', { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", '*');
    next();
})
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
    store: new sessionFileStore({
        path: './server/sessions',
    }),
    secret: config.server.secret,
    maxAge: Date().now + (60 * 1000 * 30),
    resave: true,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

app.listen(port, async () => {
    console.log(`HLS listening on port ${port}`);
});