const { Schema, model, Types } = require('mongoose')

const listTracksSchema = new Schema({
    idList: { type: Types.ObjectId, ref: 'List', required: true },
    idTrack: { type: String, required: true }
})

module.exports = model('ListInfo', listTracksSchema)