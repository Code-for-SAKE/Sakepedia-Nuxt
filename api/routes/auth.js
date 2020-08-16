import passport from 'passport'
import { Strategy } from 'passport-github'

const config = require('../config')
const { Router } = require('express')

const router = Router()

// Passport.jsの設定
router.use(passport.initialize())
router.use(passport.session())

passport.use(new Strategy(
	{
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
	},
	(accessToken, refreshToken, profile, done) => {
		return done(null, profile)
	}
))
  
passport.serializeUser((user, done) => {
	done(null, {
		id: user.id,
		name: user.username,
	  	avatarUrl: user.photos[0].value,
		email: user.email,
	})
})
passport.deserializeUser((obj, done) => {
	done(null, obj)
})

router.get('/session', (req, res) => {
    console.log("/session req.user",req.user)
	res.json({ user: req.user })
})

router.get('/auth/login', passport.authenticate('github', { scope: ['user:email'] }))
router.get('/auth/callback',
  	passport.authenticate('github'),
  	(req, res) => {
    	res.json({ user: req.user })
  	}
)
router.get('/auth/logout', (req, res) => {
	req.logout()
	res.json({})
})

module.exports = router