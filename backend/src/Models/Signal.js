const { Schema, model, Types } = require('mongoose')

const signalSchema = new Schema({
    suspectUserId: { type: Types.ObjectId, ref: 'User', required: true },
    signalerId: { type: Types.ObjectId, ref: 'User', required: true },
    feedbackId: { type: Types.ObjectId, ref: 'Feedback'},
    messageId: { type: Types.ObjectId, ref: 'ChatMessage'},
    cause: { type: String, required: true }
})

signalSchema.index({ suspectUserId: 1, signalerId: 1 }, { unique: true })

module.exports = model('Signal', signalSchema)