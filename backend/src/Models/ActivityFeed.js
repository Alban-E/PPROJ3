const { Schema, model, Types } = require('mongoose')

const activityFeedSchema = new Schema({
    type: { type: String, enum: ['feedback', 'comment', 'add_to_list', 'new_list'], required: true },
    idActivity: { type: Types.ObjectId, required: true },
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
})

module.exports = model('ActivityFeed', activityFeedSchema)