const { Schema, model, Types } = require('mongoose')

const listGamesSchema = new Schema({
    listId: { type: Types.ObjectId, ref: 'List', required: true },
    // gameId: { type: Types.ObjectId, ref: 'Game', required: true }
    gameId: String
})

listGamesSchema.index({ listId: 1, gameId: 1 }, { unique: true });

module.exports = model('ListGames', listGamesSchema)