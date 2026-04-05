require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const express = require('express')
const authRoutes = require('./routes/auth')
const trackRoutes = require('./routes/tracks')

const app = express()

app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(cookieParser())
app.use(express.json())
app.use('/auth', authRoutes)
app.use('/tracks', trackRoutes)

app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server running on port ${process.env.BACKEND_PORT}`)
})