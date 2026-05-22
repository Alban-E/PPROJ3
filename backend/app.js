require("dotenv").config()
const cors = require("cors")
const express = require("express")
const mongo = require("mongoose")
const cookieParser = require('cookie-parser')
const { searchTracks } = require('./src/Services/lastfmServices')

// Routes
const userRoutes = require('./src/Routes/userRoutes')
const authRoutes = require('./src/Routes/authRoutes')
const listRoutes = require('./src/Routes/listRoutes')
const feedbackRoutes = require('./src/Routes/feedbackRoutes')
const feedbackCommentRoutes = require('./src/Routes/feedbackCommentRoutes')
const chatRoutes = require('./src/Routes/chatRoutes')
const moderationRoutes = require('./src/Routes/moderationRoutes')
const notificationRoutes = require('./src/Routes/notificationRoutes')
const subscriberRoutes = require('./src/Routes/subscriberRoutes')
const gameRoutes = require('./src/Routes/gameRoutes')

const rawgRoutes = require('./src/Routes/rawgRoutes') 

const app = express()

app.use((req, res, next) =>{
    res.setHeader('Access-control-Allow-Origin', '*')
    res.setHeader('Access-control-Allow-Methods', 'GET POST PUT DELETE')
    res.setHeader('Access-control-Allow-Header', 'CONTENT-Type')
    next()
})

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/supify/api/test', (req, res) => res.status(200).json({message: "Test OK"}))

app.use('/supify/api/user', userRoutes)
app.use('/supify/api/auth', authRoutes)
app.use('/supify/api/list', listRoutes)
app.use('/supify/api/feedback', feedbackRoutes)
app.use('/supify/api/feedback/comment', feedbackCommentRoutes)
app.use('/supify/api/chat', chatRoutes)
app.use('/supify/api/moderation', moderationRoutes)
app.use('/supify/api/notifications', notificationRoutes)
app.use('/supify/api/subscribers', subscriberRoutes)
app.use('/supify/api/games', gameRoutes)

app.use('/supify/api/search', rawgRoutes)

mongo.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(`Error: ${err}`, err))

module.exports = app