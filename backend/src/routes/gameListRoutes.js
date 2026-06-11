const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { getGamesFromList,  addGameToList, removeGameFromList } = require('../Controllers/gameListController')

// game List relation
router.get('/list', authenticateToken, getGamesFromList)

router.post('/add', authenticateToken, addGameToList)

router.delete('/list', authenticateToken, removeGameFromList)

module.exports = router