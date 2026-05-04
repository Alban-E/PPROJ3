const { Schema, model, Types } = require('mongoose')

const chatInfoSchema = new Schema({
    idUser1: { type: Types.ObjectId, ref: 'User', required: true },
    idUser2: { type: Types.ObjectId, ref: 'User', required: true },
    idChat: { type: Types.ObjectId, ref: 'Chat', required: true }
})

module.exports = model('ChatInfo', chatInfoSchema)