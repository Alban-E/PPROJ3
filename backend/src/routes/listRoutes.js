const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const {createList, getMyLists, getUserPublicLists, getAllLists, updateList, deleteList, addTrackToList, removeTrackFromList} = require('../Controllers/listController')

//#region CRUD
// Create
router.post('', authenticateToken, createList)

// Read
router.get('/me', authenticateToken, getMyLists)
router.get('/user/:id', authenticateToken, getUserPublicLists)

router.get('/', authenticateToken, assertUserIsAdmin, getAllLists)

// Update
router.put('/:id', authenticateToken, updateList)

// Delete
router.delete('/:id', authenticateToken, deleteList)
//#endregion


//List Info (List content)
router.post('/:idList/track/:idTrack', authenticateToken, addTrackToList)

router.delete('/:idList/track/:idTrack', authenticateToken, removeTrackFromList)

module.exports = router