const { Schema, model } = require('mongoose')

const trackSchema = new Schema({
    name: { type: String, required: true },
    releaseDate: Date,
    apiId: { type: String, required: true },
    imageUrl: String,
    artist: { type: String, required: true }
})

module.exports = model('Track', trackSchema)