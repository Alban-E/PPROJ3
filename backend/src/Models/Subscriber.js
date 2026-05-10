const { Schema, model, Types } = require('mongoose')

const subscriberSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    subscriberId: { type: Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('Subscriber', subscriberSchema)