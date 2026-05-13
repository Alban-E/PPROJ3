const axios = require('axios')

const API_KEY = process.env.API_KEY
const API_URL = process.env.API_URL

const lastFm = axios.create({
    baseURL: API_URL
})

lastFm.interceptors.request.use(config => {
    config.params = {
        ...config.params,
        api_key: API_KEY,
        format: "json"
    }
    return config
})

module.exports = { lastFm }