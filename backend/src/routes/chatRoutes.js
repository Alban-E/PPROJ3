const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createChat, getMyChats, getChatWithUser, getAllChats, deleteChat, createMessage, getMessagesFromChat, getMessagesFromUser, GetAllMessages, UpdateMessage, deleteMessage } = require('../Controllers/chatController')

//#region General Chat CRUD
// Create
router.post('/', authenticateToken, createChat)

// Read
router.get('/me', authenticateToken, getMyChats)
router.get('/user', authenticateToken, getChatWithUser)

router.get('/', authenticateToken, assertUserIsAdmin, getAllChats)

// Delete
router.delete('/', authenticateToken, deleteChat)
//#endregion

//#region Chat message CRUD
// Create
router.post('/message/', authenticateToken, createMessage)

// Read
router.get('/messages', authenticateToken, getMessagesFromChat)

router.get('/messages/user', authenticateToken, getMessagesFromUser)
router.get('/messages/all', authenticateToken, assertUserIsAdmin, GetAllMessages)

// Update
router.put('/message', authenticateToken, UpdateMessage)

// Delete
router.delete('/message', authenticateToken, deleteMessage)
//#endregion



module.exports = router