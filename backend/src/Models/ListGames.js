const { Schema, model, Types } = require('mongoose')

const listGamesSchema = new Schema({
    listId: { type: Types.ObjectId, ref: 'List', required: true },
    gameId: { type: Types.ObjectId, ref: 'Game', required: true }
})

module.exports = model('ListGames', listGameSchema)