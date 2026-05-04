const { Schema, model, Types } = require('mongoose')

const trackFeedbackSchema = new Schema({
    trackId: { type: Types.ObjectId, ref: 'Track', required: true },
    feedbackId: { type: Types.ObjectId, ref: 'Feedback', required: true }
})

module.exports = model('TrackFeedback', trackFeedbackSchema)