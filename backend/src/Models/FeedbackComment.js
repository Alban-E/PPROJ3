const { Schema, model } = require('mongoose')

const feedbackCommentSchema = new Schema({
    comment: { type: String, required: true },
    originalFeedbackId: { type: Types.ObjectId, ref: 'Feedback', required: true },
    date: { type: Date, default: Date.now }
})

module.exports = model('FeedbackComment', feedbackCommentSchema)