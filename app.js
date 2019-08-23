const express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    session = require('express-session'),
    sessionFileStore = require('session-file-store')(session),
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
app.use(multer());
app.use(session({
    store: new sessionFileStore({
        path: './server/sessions',
    })
}));

app.listen(port, () => {
    console.log(`HLS listening on port ${port}`);
});