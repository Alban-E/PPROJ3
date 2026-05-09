const { Schema, model, Types } = require('mongoose')

const signalSchema = new Schema({
    suspectUserID: { type: Types.ObjectId, ref: 'User', required: true },
    signalerId: { type: Types.ObjectId, ref: 'User', required: true },
    feedbackId: { type: Types.ObjectId, ref: 'Feedback'},
    messageId: { type: Types.ObjectId, ref: 'Message'},
    cause: { type: String, required: true }
})

feedbackSchema.index({ suspectUserID: 1, signalerId: 1 }, { unique: true })

module.exports = model('Signal', signalSchema)