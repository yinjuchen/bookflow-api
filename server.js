const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const updateProfile = require('./controllers/updateprofile')
const recommendation = require('./controllers/recommendation')
const recommendationRetrieve = require('./controllers/recommendation-retrieve')
const getAllRecommendations = require('./controllers/getAllRecommendations')
const profile = require('./controllers/profile')
const searchBooks = require('./controllers/booksearch')

const db = knex({
  client: 'pg',
  connection: {
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_URL,
    user: process.env.DATABASE_USER,
    port: 5432,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB
  }
})

// setup nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const app = express()

// Middleware and bodyparser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// getting root
app.get('/', (req, res) => { res.send(db.users) })

// SignIn 
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

// Register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// Getting Profile by userid
app.get('/profile/:userid', (req, res) => { profile.handleProfile(req, res, db) })

// Updating the Bio
app.put('/updateProfile', (req, res) => { updateProfile.handleUpdateProfile(req, res, db) })

// Recommendation for sharing via email
app.post('/recommendation', (req, res) => { recommendation.handleRecommendation(req, res, db, transporter) })

// Retrive an recommendation by userid
app.get('/recommendation/:userid', (req, res) => { recommendationRetrieve.handleRecommendationRetrieve(req, res, db) })

// Retrive the entire recommendations
app.get('/recommendations', (req, res) => { getAllRecommendations.handleGetAllRecommendation(req, res, db) })

// Search books
app.post('/search-books', async (req, res) => {
  searchBooks.handleSearchbooks(req, res)
})

// Listen
app.listen(3000, () => {
  console.log('app is running on port 3000')
})
