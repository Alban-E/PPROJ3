require('dotenv').config()

const axios = require('axios')

const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL

const searchTracks = async (trackName) => {
    try {
        const result = await axios.get(BASE_URL, {
            params: {
                method: 'track.search',
                track: trackName,
                api_key: API_KEY,
                format: 'json'
            }
        })

        return result.data
    } catch (error) {
        console.error('An error occured during the api call:', error)
        throw error
    }
}

module.exports = searchTracks