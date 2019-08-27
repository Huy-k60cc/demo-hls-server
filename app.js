const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    flash = require('connect-flash'),
    session = require('express-session'),
    sessionFileStore = require('session-file-store')(session),
    passport = require('./server/auth/passport'),
    config = require('./server/config'),
    port = config.server.port,
    app = express();
mongoose.connect('mongodb://127.0.0.1/live', {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use(session({
    store: new sessionFileStore({
        path: './server/sessions',
    }),
    secret: config.server.secret,
    maxAge : Date().now + (60 * 1000 * 30),
    resave : true,
    saveUninitialized : false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/login', require('./server/routes/login'));
app.use('/register', require('./server/routes/register'));

app.listen(port, async () => {
    console.log(`HLS listening on port ${port}`);
});