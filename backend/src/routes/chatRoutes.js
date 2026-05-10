const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createChat, getMyChats, getChatWithUser, getAllChats, deleteChat, createMessage, getMessagesFromChat, getMessagesFromUser, GetAllMessages, UpdateMessage, deleteMessage } = require('../Controllers/chatController')

//#region General Chat CRUD
// Create
router.post('/:userId', authenticateToken, createChat)

// Read
router.get('/me', authenticateToken, getMyChats)
router.get('/user', authenticateToken, getChatWithUser)

router.get('/', authenticateToken, assertUserIsAdmin, getAllChats)

// Delete
router.delete('/:id', authenticateToken, deleteChat)
//#endregion

//#region Chat message CRUD
// Create
router.post('/:chatId/', authenticateToken, createMessage)

// Read
router.get('/:chatId/messages', authenticateToken, getMessagesFromChat)

router.get('/messages', authenticateToken, getMessagesFromUser)
router.get('/messages/all', authenticateToken, assertUserIsAdmin, GetAllMessages)

// Update
router.put('/message', authenticateToken, UpdateMessage)

// Delete
router.delete('/message', authenticateToken, deleteMessage)
//#endregion



module.exports = router