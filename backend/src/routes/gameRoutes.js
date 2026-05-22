const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createGame, getGameById, getGamesByName, getAllGames, deleteGame, getGamesFromList,  addGameToList, removeGameFromList } = require('../Controllers/gameController')

//#region Track CRUD
// Create
router.post('/', authenticateToken, assertUserIsAdmin, createGame)

// Read
router.post('/id', getGameById)
router.post('/name', getGamesByName)

router.get('/', getAllGames)

// Delete
router.delete('/', authenticateToken, assertUserIsAdmin, deleteGame)
//#endregion

// track List relation
router.post('/inlist', authenticateToken, getGamesFromList)

router.post('/add', authenticateToken, addGameToList)

router.delete('/list', authenticateToken, removeGameFromList)

module.exports = router