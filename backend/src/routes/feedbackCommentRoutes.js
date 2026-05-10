const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createFeedbackComment, getFeedbackCommentByFeedbackId, getUserFeedbackComment, getAllFeedBackComment, updateFeedbackComment, deleteFeedbackComment } = require('../Controllers/feedbackCommentController')

//#region CRUD
// Create
router.post('/:feedbackId', authenticateToken, createFeedbackComment)

// Read
router.get('/:feedbackId', getFeedbackCommentByFeedbackId)
router.get('/user', getUserFeedbackComment)

router.get('/', authenticateToken, assertUserIsAdmin, getAllFeedBackComment)

// Update
router.put('/:id', authenticateToken, updateFeedbackComment)

// Delete
router.delete('/:id', authenticateToken, deleteFeedbackComment)
//#endregion

module.exports = router