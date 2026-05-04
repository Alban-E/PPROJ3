const { Schema, model, Types } = require('mongoose')

const signalSchema = new Schema({
    idUser: { type: Types.ObjectId, ref: 'User', required: true },
    idFeedback: { type: Types.ObjectId, ref: 'Feedback', required: true },
    cause: { type: String, required: true }
})

module.exports = model('Signal', signalSchema)