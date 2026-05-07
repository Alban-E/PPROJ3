const { Schema, model, Types } = require('mongoose')

const listSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: 'New List', maxlength: 50 },
    private: { type: Boolean, default: true },
    creationDate: { type: Date, default: Date.now }
})

listSchema.index({ userId: 1, nameId: 1 }, { unique: true })

module.exports = model('List', listSchema)