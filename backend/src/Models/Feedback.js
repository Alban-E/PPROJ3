const { Schema, model, Types } = require('mongoose')

const feedbackSchema = new Schema({
    rating: Number,
    comment: String,
    gameId: { type:String, required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
})

feedbackSchema.index({ trackId: 1, userId: 1 }, { unique: true })

module.exports = model('Feedback', feedbackSchema)