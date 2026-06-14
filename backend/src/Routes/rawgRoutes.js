const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { getGames, getGamesById, getGameAchievements, getGameTrailer, getPublisherById, getGamesByPublishers } = require('../Controllers/RawgController')

router.get('/games', getGames)

router.get('/game/id', getGamesById)

router.get('/game/achievements', getGameAchievements)

router.get('/game/trailers', getGameTrailer)

router.get('/publisher', getPublisherById)

router.get('/publisher/games', getGamesByPublishers)

module.exports = router