const express = require('express');
const path = require('path');
require('dotenv').config();
const passport = require('passport');
const BnetStrategy = require('passport-bnet').Strategy;

// create express app
const app = express();

// MIDDLEWARE
app.use(express.static('dist'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new BnetStrategy({
  clientID: process.env.BNET_ID,
  clientSecret: process.env.BNET_SECRET,
  callbackURL: '/auth/bnet/callback',
  region: 'eu',
}, ((accessToken, refreshToken, profile, done) => {
  done(null, profile);
  console.log('a', accessToken);
  console.log('r', refreshToken);
  console.log('p', profile);
})));

// START SERVER
app.listen(8080, () => {
  console.log('server started on port 8080');
});

// handle BNet auth
app.get('/auth/bnet', passport.authenticate('bnet'));

app.get('/auth/bnet/callback',
  passport.authenticate('bnet', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    res.redirect('/success-login');
  });

// handle React routing
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
