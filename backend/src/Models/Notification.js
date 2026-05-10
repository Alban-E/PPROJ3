const { Schema, model, Types } = require('mongoose')

const notificationSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true, maxlength: 100 },
    type: { type: String, enum: ['new_message', 'new_subscriber', 'new_track'], required: true },
    isRead: { type: Boolean, default: false }
})

module.exports = model('Notification', notificationSchema)