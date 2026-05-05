const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    login: { type: String, unique: true },
    password: String,
    oauth_provider: String,
    oauth_id: String,
    username: { type: String, default: 'Username', required: true, maxlength: 20 },
    avatar_url: String,
    bio: String,
    is_private: { type: Boolean, default: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user', required: true }
})

module.exports = model('User', userSchema)