const { Schema, model, Types } = require('mongoose')

const chatMessageSchema = new Schema({
    idChat: { type: Types.ObjectId, ref: 'Chat', required: true },
    idMessage: { type: Types.ObjectId, ref: 'Message', required: true },
    idSender: { type: Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('ChatMessage', chatMessageSchema)