const router = require('express').Router()
const {authenticateToken, assertUserIsAdmin} = require('../middlewares/authVerif')

module.exports = router