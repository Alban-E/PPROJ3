const { Schema, model, Types } = require('mongoose')

const chatMessageSchema = new Schema({
    chatId: { type: Types.ObjectId, ref: 'Chat', required: true },
    senderId: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    Date: { type: Date, default: Date.now }

})

module.exports = model('ChatMessage', chatMessageSchema)