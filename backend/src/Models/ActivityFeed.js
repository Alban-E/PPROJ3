const { Schema, model, Types } = require('mongoose')

const activityFeedSchema = new Schema({
    type: { type: String, enum: ['rate', 'feedback', 'comment', 'add_to_list', 'new_list'], required: true },
    idActivity: { type: Types.ObjectId, required: true },
    idUser: { type: Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now }
})

module.exports = model('ActivityFeed', activityFeedSchema)