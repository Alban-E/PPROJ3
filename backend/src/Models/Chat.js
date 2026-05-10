const { Schema, model, Types } = require('mongoose')

const chatSchema = new Schema({
    userId1: { type: Types.ObjectId, ref: 'User', required: true },
    userId2: { type: Types.ObjectId, ref: 'User', required: true },
})

chatSchema.index({ userId1: 1, userId2: 1 }, { unique: true })

module.exports = model('Chat', chatSchema)