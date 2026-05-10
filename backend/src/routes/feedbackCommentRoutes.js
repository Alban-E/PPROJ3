const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createFeedbackComment, getFeedbackCommentByFeedbackId, getUserFeedbackComment, getAllFeedBackComment, updateFeedbackComment, deleteFeedbackComment } = require('../Controllers/feedbackCommentController')

//#region CRUD
// Create
router.post('/', authenticateToken, createFeedbackComment)

// Read
router.get('/origin', getFeedbackCommentByFeedbackId)
router.get('/user', getUserFeedbackComment)

router.get('/', authenticateToken, assertUserIsAdmin, getAllFeedBackComment)

// Update
router.put('/', authenticateToken, updateFeedbackComment)

// Delete
router.delete('/', authenticateToken, deleteFeedbackComment)
//#endregion

module.exports = router