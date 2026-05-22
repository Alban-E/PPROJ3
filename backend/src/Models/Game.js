const { Schema, model } = require('mongoose')

const gameSchema = new Schema({
    name: { type: String, required: true },
    releaseDate: Date,
    apiId: { type: String, required: true },
    imageUrl: String,
})

module.exports = model('Game', gameSchema)