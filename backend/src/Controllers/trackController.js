const Track = require('../Models/Tracks')
const ListTrack = require('../Models/ListTracks')
const List = require('../Models/List')

// #region Track message CRUD
// CRUD OPERATIONS
// Create
const createTrack = async (req, res) => {
    try {
        const existingTrack = await Track.findOne({name: req.body.name, artist: req.body.artist})
        if (existingTrack) {
            return res.status(409).json({messsage: "A track with this name from this artist already exist, dont duplicate tracks unnecessarily"})
        }

        const track = await Track.create({
            name: req.body.name,
            releaseDate: req.body.releaseDate,
            apiId: req.body.apiId,
            imageUrl: req.body.imageUrl,
            artist: req.body.artist
        })

        res.status(201).json({message: 'Track created', track: track })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getTracksById = async (req, res) => {
    try {
        const track = await Track.findById(req.query.trackId)
        if (!track) {
            return res.status(404).json({message: "No track found with this id"})
        }
                
        return res.status(200).json(track)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getTracksByArtist = async (req, res) => {
    try {
        const tracks = await Track.find({artist: req.query.artist})
        if (!tracks) {
            return res.status(404).json({message: "No track found from this artist"})
        }
                
        return res.status(200).json(tracks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getTracksByName = async (req, res) => {
    try {
        const tracks = await Track.find({name: req.query.name})
        if (!tracks) {
            return res.status(404).json({message: "No track found from this user"})
        }
                
        return res.status(200).json(tracks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find()
        
        if(!tracks){
            return res.status(404).json({message: "No track found"})
        }
        
        return res.status(200).json(tracks)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteTracks = async (req, res) => {
    try {
        const track = await Track.findById(req.query.trackId)
        
        if(!track){
            return res.status(404).json({message: "No track found"})
        }
        
        await track.deleteOne()
        return res.status(200).json({message: "Track deleted successfully"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

const getTracksFromList = async (req, res) => {
    try {
        const tracksInList = await ListTrack.find({listId: req.query.listId})
        const trackIds = tracksInList.map(t => t.trackId)
        const tracks = await Track.find({ _id: { $in: trackIds } })

        return res.status(200).json(tracks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addTrackToList = async (req, res)=> {
    try {     
        const list = await List.findById(req.query.listId)
        if (!list) {
            return res.status(404).json({message: "There is no existing list with this id"})
        }          

        if (String(list.userId) !== String(req.user.userId) || String(req.user.userRole) !== "admin") {
            return res.status(401).json({message: "Unauthorized operation, the user logged is not the owner of the list"})
        }

        const AlreadyInList = await ListTrack.findOne({listId: req.query.listId, trackId: req.query.trackId})

        if (AlreadyInList) {
            return res.status(409).json({message: "The list already contains this track"})
        }

        const listTrack = await ListTrack.create({
            listId: req.query.listId,
            trackId: req.query.trackId
        })

        res.status(201).json({message: 'Track added to list', list: list })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const removeTrackFromList = async (req, res) => {
    try {     
        const list = await List.findById(req.query.listId)
        if (!list) {
            return res.status(404).json({message: "There is no existing list with this id"})
        }          

        if (String(list.userId) !== String(req.user.userId) || String(req.user.userRole) !== "admin") {
            return res.status(401).json({message: "Unauthorized operation, the user logged is not the owner of the list"})
        }

        const trackIsInList = await ListTrack.findOne({listId: req.query.listId, trackId: req.query.trackId})
        if (trackIsInList) {
            await trackIsInList.deleteOne()
            return res.status(200).json({message: "Track deleted from list"})
        }

        res.status(404).json({message: "The track is not in the lsit" })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = { createTrack, getTracksById, getTracksByArtist, getTracksByName, getAllTracks, deleteTracks, getTracksFromList,  addTrackToList, removeTrackFromList }