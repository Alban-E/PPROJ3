const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createNotification, getMyNotifications, getNotificationsByUser, getAllNotification, deleteNotification } = require('../Controllers/notificationController')

//#region notification CRUD
// Create
router.post('/', authenticateToken, createNotification)

// Read
// Can filter by type in the query params
router.get('/me', authenticateToken, getNotificationsByUser)

// Can filter by type in the query params
router.get('/user', authenticateToken, assertUserIsAdmin, getNotificationsByUser)
// Can filter by type in the query params
router.get('/', authenticateToken, assertUserIsAdmin, getAllNotification)

// Delete
router.delete('/', authenticateToken, deleteNotification)
//#endregion


module.exports = router