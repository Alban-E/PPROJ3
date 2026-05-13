const { lastFm } = require('../Services/lastfmServices')

const searchTracks = async (req, res) => {
    try {
        const { track, page, limit, artist } = req.query
        const result = await lastFm.get("", {
            params: {
                method: 'track.search',
                track: track,
                page: page,
                limit: limit,
                artist: artist,
            }
        })

        return res.status(200).json(result.data.results.trackmatches.track)
    } catch (error) {
        console.error('An error occured during the api call:', error)
        throw error
    }
}



module.exports = {searchTracks}