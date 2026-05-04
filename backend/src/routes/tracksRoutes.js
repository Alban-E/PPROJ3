const router = require('express').Router()
const searchTracks = require('../controllers/trackController')

router.get('/searchTracks', searchTracks)

module.exports = router