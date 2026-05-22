const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { getGames, getGamesById } = require('../Controllers/RawgController')

router.get('/games', getGames)

router.get('/game/id', getGamesById)

module.exports = router