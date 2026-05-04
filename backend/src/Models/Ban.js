const { Schema, model, Types } = require('mongoose')

const banSchema = new Schema({
    idBanned: { type: Types.ObjectId, ref: 'User', required: true },
    idBanner: { type: Types.ObjectId, ref: 'User', required: true },
    banReason: { type: String, required: true },
    bannedAt: { type: Date, required: true }
})

module.exports = model('Ban', banSchema)