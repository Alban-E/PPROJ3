const { Schema, model, Types } = require('mongoose')

const signalSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    idFeedback: { type: Types.ObjectId, ref: 'Feedback', required: true },
    cause: { type: String, required: true }
})

module.exports = model('Signal', signalSchema)