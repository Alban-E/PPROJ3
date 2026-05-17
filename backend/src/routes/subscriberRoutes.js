const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createSubscriber, getMySubscribers, getMySubscriptions, getSubscriberByUser, getSubscriptionsByUser, getAllSubscribers, deleteSubscriber } = require('../Controllers/subscriberController')

//#region subscriber CRUD
// Create
router.post('/', authenticateToken, createSubscriber)

// Read
router.get('/me/subscribers', authenticateToken, getMySubscribers)
router.get('/me/subscriptions', authenticateToken, getMySubscriptions)

router.get('/user/subscribers', authenticateToken, getSubscriberByUser)
router.get('/user/subscriptions', authenticateToken, getSubscriptionsByUser)

router.get('/', authenticateToken, getAllSubscribers)

// Delete
router.delete('/', authenticateToken, deleteSubscriber)
//#endregion


module.exports = router