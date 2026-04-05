const lastFM = require('../services/lastfmServices')

const searchTracks = async (req, res) => {
    try {
        const trackName = req.query.track
        const result = await lastFM(trackName)   
        res.json(result)
    } catch (error) {
        console.error('Api call error:', error);
        return res.status(500).json({ message: 'Error during the api call' });
    }
}

module.exports = searchTracks