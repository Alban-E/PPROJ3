const { Schema, model } = require('mongoose')

const feedbackCommentSchema = new Schema({
    originalFeedbackId: { type: Types.ObjectId, ref: 'Feedback', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = model('FeedbackComment', feedbackCommentSchema)