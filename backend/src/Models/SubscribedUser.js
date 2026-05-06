const { Schema, model, Types } = require('mongoose')

const subscribedUserSchema = new Schema({
    idSubcriber: { type: Types.ObjectId, ref: 'User', required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('SubscribedUser', subscribedUserSchema)