const { Schema, model, Types } = require('mongoose')

const userCommentSchema = new Schema({
    userId: { type: Types.ObjectId, ref: 'User', required: true },
    idComment: { type: Types.ObjectId, ref: 'Comment', required: true }
})

module.exports = model('UserComment', userCommentSchema)