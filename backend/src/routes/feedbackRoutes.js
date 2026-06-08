const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createFeedback, getMyFeedbacks, getUserFeedbacks, getGameFeedbacks, getMyGameFeedback, getAllFeedbacks, updateFeedback, deleteFeedback } = require('../Controllers/feedbackController')

//#region CRUD
// Create
router.post('/', authenticateToken, createFeedback)

// Read
router.get('/me', authenticateToken, getMyFeedbacks)
router.get('/user', authenticateToken, getUserFeedbacks)
router.get('/game', authenticateToken, getGameFeedbacks)
router.get('/me/game', authenticateToken, getMyGameFeedback)

router.get('/', authenticateToken, assertUserIsAdmin, getAllFeedbacks)

// Update
router.put('/', authenticateToken, updateFeedback)

// Delete
router.delete('/:feedbackId', authenticateToken, deleteFeedback)
//#endregion

module.exports = router