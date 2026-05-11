const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createTrack, getTracksById, getTracksByArtist, getTracksByName, getAllTracks, deleteTracks, getTracksFromList, addTrackToList, removeTrackFromList } = require('../Controllers/trackController')

//#region Track CRUD
// Create
router.post('/', authenticateToken, assertUserIsAdmin, createTrack)

// Read
router.get('/id', getTracksById)
router.get('/artist', getTracksByArtist)
router.get('/name', getTracksByName)

router.get('/', getAllTracks)

// Delete
router.delete('/', authenticateToken, assertUserIsAdmin, deleteTracks)
//#endregion

// track List relation
router.get('/list', authenticateToken, getTracksFromList)

router.post('/list', authenticateToken, addTrackToList)

router.delete('/list', authenticateToken, removeTrackFromList)

module.exports = router