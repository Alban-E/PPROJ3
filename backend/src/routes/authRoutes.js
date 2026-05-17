const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../Middlewares/authVerif')
const { login, logout } = require('../Controllers/authController')

router.post('/login', login)

router.post('/logout', authenticateToken, logout)

module.exports = router