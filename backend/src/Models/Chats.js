const { Schema, model } = require('mongoose')

const chatSchema = new Schema({})

module.exports = model('Chat', chatSchema)