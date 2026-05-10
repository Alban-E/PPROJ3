const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createChat, getMyChats, getChatWithUser, getAllChats, deleteChat, createMessage, getMessagesFromChat, getMessagesFromUser, GetAllMessages, UpdateMessage, deleteMessage } = require('../Controllers/chatController')

//#region General Chat CRUD
// Create
router.post('/:userId', authenticateToken, createChat)

// Read
router.get('/me', authenticateToken, getMyChats)
router.get('/user/:userId', authenticateToken, getChatWithUser)

router.get('/', authenticateToken, assertUserIsAdmin, getAllChats)

// Delete
router.delete('/:id', authenticateToken, deleteChat)
//#endregion

//#region Chat message CRUD
// Create
router.post('/:chatId/', authenticateToken, createMessage)

// Read
router.get('/:chatId', authenticateToken, getMessagesFromChat)

router.get('/:userId', authenticateToken, getMessagesFromUser)
router.get('/', authenticateToken, assertUserIsAdmin, GetAllMessages)

// Update
router.put('/:messageId', authenticateToken, UpdateMessage)

// Delete
router.delete('/:messageId', authenticateToken, deleteMessage)
//#endregion



module.exports = router