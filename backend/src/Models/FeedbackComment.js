const { Schema, model, Types } = require('mongoose')

const feedbackCommentSchema = new Schema({
    idOriginal: { type: Types.ObjectId, ref: 'Feedback', required: true },
    idComment: { type: Types.ObjectId, ref: 'Comment', required: true }
})

module.exports = model('FeedbackComment', feedbackCommentSchema)