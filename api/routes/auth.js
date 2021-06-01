import passport from 'passport';
import { Strategy } from 'passport-github';
const User = require('../models/User');
const usersController = require('../controllers/usersController');

const config = require('../config');
const { Router } = require('express');

const router = Router();

// Passport.jsの設定
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ type: 'git', identity: profile.id });
      if (user === null) {
        usersController.create(
          'git',
          profile.id,
          profile.photos[0].value,
          profile.username
        );
      }
      const currentUser = await User.findOne({
        type: 'git',
        identity: profile.id,
      });
      return done(null, currentUser);
    }
  )
);

passport.serializeUser((currentUser, done) => {
  done(null, {
    _id: currentUser._id,
  });
});
passport.deserializeUser(async (obj, done) => {
  const user = await User.findOne({ _id: obj._id });
  done(null, user);
});

router.get('/session', (req, res) => {
  console.log('/session req.user', req.user);
  res.json({ user: req.user });
});

router.get(
  '/auth/login',
  passport.authenticate('github', { scope: ['user:email'] })
);
router.get('/auth/callback', passport.authenticate('github'), (req, res) => {
  res.json({ user: req.user });
});
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.json({});
});

module.exports = router;
