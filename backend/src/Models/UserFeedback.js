const { Schema, model, Types } = require('mongoose')

const userFeedbackSchema = new Schema({
    idUser: { type: Types.ObjectId, ref: 'User', required: true },
    idFeedback: { type: Types.ObjectId, ref: 'Feedback', required: true },
    liked: { type: Boolean, default: false }
})

module.exports = model('UserFeedback', userFeedbackSchema)