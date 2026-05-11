const { Schema, model, Types } = require('mongoose')

const listTracksSchema = new Schema({
    listId: { type: Types.ObjectId, ref: 'List', required: true },
    trackId: { type: String, required: true }
})

module.exports = model('ListTrack', listTracksSchema)