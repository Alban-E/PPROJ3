const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { searchTrack, searchArtist, searchArtistTracks, searchArtistAlbums, searchAlbum, searchAlbumTags } = require('../Controllers/lastFmController')

router.get('/tracks', searchTrack)

router.get('/artist', searchArtist)
router.get('/artist/tracks', searchArtistTracks)
router.get('/artist/album', searchArtistAlbums)

router.get('/album', searchAlbum)
router.get('/album/tags', searchAlbumTags)

module.exports = router