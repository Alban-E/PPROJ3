const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../Middlewares/authVerif')
const { login, logout, logWithGoogle } = require('../Controllers/authController')
const passport = require("passport")

router.get('/google', passport.authenticate('google', {scope: ['Profile', 'email']}))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: `http://localhost:${process.env.FRONTEND_PORT}/Account`, session: false }), logWithGoogle)

router.post('/login', login)

router.post('/logout', authenticateToken, logout)

module.exports = router