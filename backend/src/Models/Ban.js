const { Schema, model, Types } = require('mongoose')

const banSchema = new Schema({
    bannedId: { type: Types.ObjectId, ref: 'User', required: true },
    bannerId: { type: Types.ObjectId, ref: 'User', required: true },
    banReason: { type: String, required: true },
    active: { type: Boolean, default: true },
    bannedAt: { type: Date, default: Date.now }
})

module.exports = model('Ban', banSchema)