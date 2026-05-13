const { lastFm } = require('../Services/lastfmServices')

//#region Tracks
const searchTrack = async (req, res) => {
    try {
        const { track, artist, page, limit } = req.query
        const result = await lastFm.get("", {
            params: {
                method: 'track.search',
                track: track,
                artist: artist,
                page: page,
                limit: limit,
            }
        })

        return res.status(200).json(result.data.results.trackmatches.track)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

//#region Artist
const searchArtist = async (req, res) => {
    try {
        const { artist, page, limit } = req.query
        const result = await lastFm.get("", {
            params: {
                method: 'artist.search',
                artist: artist,
                page: page,
                limit: limit,
            }
        })

        return res.status(200).json(result.data.results.artistmatches.artist)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const searchArtistTracks = async (req, res) => {
    try {
        const { artist, page, limit } = req.query
        const result = await lastFm.get("", {
            params: {
                method: 'artist.getTopTracks',
                artist: artist,
                page: page,
                limit: limit,
            }
        })

        return res.status(200).json(result.data.toptracks.track)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const searchArtistAlbums = async (req, res) => {
    try {
        const { artist, page, limit } = req.query
        const result = await lastFm.get("", {
            params: {
                method: 'artist.getTopAlbums',
                artist: artist,
                page: page,
                limit: limit,
            }
        })

        return res.status(200).json(result.data.topalbums.album)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

//#region album 
const searchAlbum = async (req, res) => {
    try {
        const { album, page, limit } = req.query
        const result = await lastFm.get("", {
            params: {
                method: 'album.search',
                album: album,
                page: page,
                limit: limit,
                autocorrect: 1
            }
        })

        return res.status(200).json(result.data.results.albummatches.album)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const searchAlbumTags = async (req, res) => {
    try {
        const { artist, album, page, limit } = req.query
        const result = await lastFm.get("", {
            params: {
                method: 'album.getTopTags',
                artist: artist,
                album: album,
            }
        })

        return res.status(200).json(result.data.toptags.tag)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.exports = { searchTrack, searchArtist, searchArtistTracks, searchArtistAlbums, searchAlbum, searchAlbumTags }