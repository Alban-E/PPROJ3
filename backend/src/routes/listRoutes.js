const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const {createList, getMyLists, getUserPublicLists, getAllLists, updateList, deleteList, addTrackToList, removeTrackFromList} = require('../Controllers/listController')

//#region CRUD
// Create
router.post('/', authenticateToken, createList)

// Read
router.get('/me', authenticateToken, getMyLists)
router.get('/user', authenticateToken, getUserPublicLists)

router.get('/user/all', authenticateToken, getUserPublicLists)

router.get('/', authenticateToken, assertUserIsAdmin, getAllLists)

// Update
router.put('/', authenticateToken, updateList)

// Delete
router.delete('/', authenticateToken, deleteList)
//#endregion


//List Info (List content)
router.post('/:listId/track', authenticateToken, addTrackToList)

router.delete('/:listId/track', authenticateToken, removeTrackFromList)

module.exports = router