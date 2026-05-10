const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createSubscriber, getMySubscribers, getMySubscriptions, getSubscriberByUser, getAllSubscribers, deleteSubscriber } = require('../Controllers/subscriberController')

//#region subscriber CRUD
// Create
router.post('/', authenticateToken, createSubscriber)

// Read
router.get('/me/subscribers', authenticateToken, getMySubscribers)
router.get('/me/subscriptions', authenticateToken, getMySubscriptions)

router.get('/subscribers', authenticateToken, getSubscriberByUser)
router.get('/subscriptions', authenticateToken, getSubscriberByUser)

router.get('/', authenticateToken, getAllSubscribers)

// Delete
router.delete('/', authenticateToken, deleteSubscriber)
//#endregion


module.exports = router