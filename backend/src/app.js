require("dotenv").config()
const cors = require("cors")
const express = require("express")
const mongo = require("mongoose")

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const listRoutes = require('./routes/listRoutes')
const trakcRoutes = require('./routes/tracksRoutes')

const app = express()

app.use((req, res, next) =>{
    res.setHeader('Access-control-Allow-Origin', '*')
    res.setHeader('Access-control-Allow-Methods', 'GET POST PUT DELETE')
    res.setHeader('Access-control-Allow-Header', 'CONTENT-Type')
    next()
})

app.use(cors())
app.use(express.json())

mongo.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(`Error: ${err}`, err))

module.exports = app