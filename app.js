require('dotenv').config();

var FacebookTokenStrategy = require('passport-facebook-token');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var passport = require('passport');
var apiRouter = require('./routes/task');
var app = express();
var mongoose = require('mongoose');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  next();
};

//CORS middleware  In my configuration the client is running localhost:4200

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET
    },
    function(accessToken, refreshToken, profile, done) {
      let user = {
        email: profile.emails[0].value,
        name: profile.name.givenName + ' ' + profile.name.familyName,
        id: profile.id,
        token: accessToken
      };

      // You can perform any necessary actions with your user at this point,
      // e.g. internal verification against a users table,
      // creating new user entries, etc.

      return done(null, user); // the user object we just made gets passed to the route's controller as `req.user`
    }
  )
);

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('connection successful'))
  .catch(err => console.error(err));

app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(allowCrossDomain);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.PROD === 'true') {
  app.use('/', express.static(path.join(__dirname, 'public/index.html')));
}

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());

//  For my app I plan to make this the GraphQL end-point
app.get('/protected', (req, res) => {
  // calling this so as to catch error and respond without 500 and pass all the details to the user.
  passport.authenticate('facebook-token', { session: false }, function(err, user, info) {
    console.log('insde endpoint', user);
    //console.log('error', err, 'user', user, 'info', info);
    if (err) {
      if (err.oauthError) {
        var oauthError = JSON.parse(err.oauthError.data);
        res.status(401).send(oauthError.error.message);
      } else {
        res.send(err);
      }
    } else {
      // do the logic of actual end point here.
      res.send(user);
    }
  })(req, res);
});

app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler old
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
