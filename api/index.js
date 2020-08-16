import express from 'express'
import session from 'express-session'

const db =require('./db')

// Create express instnace
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// sessionの設定
app.use(session({
	secret: process.env.SESSION_SECRET || 'secret',
	resave: true,
	saveUninitialized: true,
	cookie: {
	  	secure: 'auto'
	}
}))


// Require & Import API routes
const auth = require('./routes/auth')
const breweries = require('./routes/breweries')
const sakes = require('./routes/sakes')

//Authenticate
app.use(auth)

// Use API Routes
//app.use(users)
app.use(breweries)
app.use(sakes)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app,
}
