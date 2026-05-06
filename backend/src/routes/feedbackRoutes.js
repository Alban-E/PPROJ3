const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createFeedback, getMyFeedbacks, getUserFeedbacks, getAllFeedbacks, updateFeedback, deleteFeedback } = require('../Controllers/feedbackController')

//#region CRUD
// Create
router.post('/:trackId', authenticateToken, createFeedback)

// Read
router.get('/me', authenticateToken, getMyFeedbacks)
router.get('/user/:userId', authenticateToken, getUserPublicFeedbacks)

router.get('/', authenticateToken, assertUserIsAdmin, getAllFeedbacks)

// Update
router.put('/:id', authenticateToken, updateFeedback)

// Delete
router.delete('/:id', authenticateToken, deleteFeedback)
//#endregion

module.exports = router