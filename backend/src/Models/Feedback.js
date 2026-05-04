const { Schema, model } = require('mongoose')

const feedbackSchema = new Schema({
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
})

module.exports = model('Feedback', feedbackSchema)