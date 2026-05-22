const axios = require('axios')

const API_KEY = process.env.API_KEY
const API_URL = process.env.API_URL

const rawgApi = axios.create({
    baseURL: API_URL,
    params: {
        key: API_KEY
    }
})

module.exports = { rawgApi }