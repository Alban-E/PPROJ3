const { Schema, model } = require('mongoose')

const trackSchema = new Schema({
    name: { type: String, required: true },
    release_date: Date,
    api_id: { type: String, required: true },
    image_url: String,
    artist: { type: String, required: true }
})

module.exports = model('Track', trackSchema)