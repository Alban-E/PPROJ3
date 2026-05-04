const { Schema, model, Types } = require('mongoose')

const subscribedUserSchema = new Schema({
    idSubcriber: { type: Types.ObjectId, ref: 'User', required: true },
    idUser: { type: Types.ObjectId, ref: 'User', required: true }
})

module.exports = model('SubscribedUser', subscribedUserSchema)