var express = require('express');
var passport = require('passport');

var FacebookTokenStrategy = require('passport-facebook-token');

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
