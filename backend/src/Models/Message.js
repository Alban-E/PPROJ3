const { Schema, model, Types } = require('mongoose')

const messageSchema = new Schema({
    content: { type: String, required: true },
    Date: { type: Date, default: Date.now }
})

module.exports = model('Message', messageSchema)