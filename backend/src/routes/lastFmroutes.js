const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { searchTracks } = require('../Controllers/lastFmController')

router.get('/tracks', searchTracks)

module.exports = router