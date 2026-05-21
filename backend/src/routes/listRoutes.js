const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const {createList, getListById, getMyLists, getUserPublicLists, getUserLists, getAllLists, updateList, deleteList } = require('../Controllers/listController')

//#region CRUD
// Create
router.post('/', authenticateToken, createList)

// Read
router.post('/id', authenticateToken, getListById)
router.get('/me', authenticateToken, getMyLists)
router.get('/user', authenticateToken, getUserPublicLists)

router.get('/user/all', authenticateToken, getUserLists)

router.get('/', authenticateToken, assertUserIsAdmin, getAllLists)

// Update
router.put('/', authenticateToken, updateList)

// Delete
router.delete('/', authenticateToken, deleteList)
//#endregion



module.exports = router