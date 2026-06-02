const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { getGames, getGamesById, getGameAchievements, getGameTrailer, getPublisherById, getGamesByPublishers } = require('../Controllers/RawgController')

router.post('/games', getGames)

router.post('/game/id', getGamesById)

router.post('/game/achievements', getGameAchievements)

router.post('/game/trailers', getGameTrailer)

router.post('/publisher', getPublisherById)

router.post('/publisher/games', getGamesByPublishers)

module.exports = router