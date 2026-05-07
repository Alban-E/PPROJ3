const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createChat, getMyChats, getChatWithUser, GetAllChats, updateChat, deleteChat } = require('../Controllers/chatController')

//#region CRUD
// Create
router.post('/:userId', authenticateToken, createChat)

// Read
router.get('/me', authenticateToken, getMyChats)
router.get('/user/:userId', authenticateToken, getChatWithUser)

router.get('/', authenticateToken, assertUserIsAdmin, GetAllChats)

// Delete
router.delete('/:id', authenticateToken, deleteChat)
//#endregion

module.exports = router