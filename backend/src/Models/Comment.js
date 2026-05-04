const { Schema, model } = require('mongoose')

const commentSchema = new Schema({
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

module.exports = model('Comment', commentSchema)