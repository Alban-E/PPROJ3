const { Schema, model, Types } = require('mongoose')

const userNotificationSchema = new Schema({
    idNotification: { type: Types.ObjectId, ref: 'Notification', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    isRead: { type: Boolean, default: false }
})

module.exports = model('UserNotification', userNotificationSchema)