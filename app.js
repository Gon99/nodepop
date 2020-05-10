var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();

var app = express();

require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/* i18n Configure */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);

app.locals.title = 'Nodepop';
const jwtAuth = require('./lib/jwtAuth');

/* RUTAS API */
app.use('/api/advertisements/tags',jwtAuth(), require('./routes/api/tags'));
app.use('/api/advertisements', jwtAuth(),require('./routes/api/advertisements'));

app.use('/change-locale', require('./routes/change-locale'));

//const loginController = require('./routes/login/loginController');
/* RUTAS WEBSITE */
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login/loginRouting'));
app.use('/logout', require('./routes/login/loginRouting'));
app.use('/users', require('./routes/users'));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
