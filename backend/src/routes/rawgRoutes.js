const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { getGames, getGamesById } = require('../Controllers/RawgController')

router.post('/games', getGames)

router.post('/game/id', getGamesById)

module.exports = router