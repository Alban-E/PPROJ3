const List = require('../Models/List')
const ListInfo = require('../Models/ListTracks')

// #region CRUD
// CRUD OPERATIONS
// Create
const createList = async (req, res) => {
    try {
        const listWithSameName = List.findOne({name: req.body.listName})
        if (listWithSameName) {
            return res.status(409).json({message: "A list with the same name already exist"})
        }

        const list = await List.create({
            userId: req.user.userId,
            name: req.body.listName,
            private: req.body.private
        })

        res.status(201).json({message: 'List created', list: list })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getMyLists = async (req, res) => {
    try {
        const lists = await List.find({userId: req.user.userId})
        
        if(!lists){
            return res.status(404).json({message: "No list found"})
        }
        
        return res.status(200).json(lists)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUserPublicLists = async (req, res) => {
    try {
        const lists = await List.find({userId: req.params.id, private: false})
        
        if(!lists){
            return res.status(404).json({message: "No public list found"})
        }
        
        return res.status(200).json(lists)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllLists = async (req, res) => {
    try {
        const lists = await List.find()
        
        if(!lists){
            return res.status(404).json({message: "No list found"})
        }
        
        return res.status(200).json(lists)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Update
const updateList = async (req, res) => {
    try {
        const list = await List.findById(req.params.id)
        
        if (!list) {
            return res.status(404).json({message: "List not found"})
        }
        
        if ((list.userId === req.user.userId) || (req.user.userRole === 'admin')){
            const {name, private} = req.body;
            
            if (name) {
                const existingName = await List.find({name: name})
                if (!existingName) {
                    list.name = name
                }
            }
            if (private) {
                list.private = private
            }
            
            await list.save();
            return res.status(200).json({message: "List updated"})
        }

        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteList = async (req, res) => {
    try {
        const list = await List.findById(req.params.id)
        
        if (!list) {
            return res.status(404).json({message: "List not found"})
        }
        
        if ((list.userId === req.user.userId) || (req.user.userRole === 'admin')){
            await list.deleteOne()
            return res.status(200).json({message: "List deleted successfully"})
        }

        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

const addTrackToList = async (req, res)=> {
    try {     
        const list = await List.findById(req.params.idList)
        if (!list) {
            return res.status(404).json({message: "There is no existing list with this id"})
        }          

        if (list.userId != req.user.userId || String(req.user.userRole) === "admin") {
            return req.status(401).json({message: "Unauthorized operation, the user logged is not the owner of the list"})
        }

        const AlreadyInList = await LisInfo.find({idList: req.params.idList, idTrack: req.params.idTrack})

        if (AlreadyInList) {
            return res.status(409).json({message: "The list already contains this track"})
        }

        const listTracks = await ListTracks.create({
            idList: req.params.idList,
            idTrack: req.params.idTrack
        })

        res.status(201).json({message: 'List created', list: list })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const removeTrackFromList = async (req, res) => {
    try {     
        const list = await List.findById(req.params.idList)
        if (!list) {
            return res.status(404).json({message: "There is no existing list with this id"})
        }          

        if (list.userId != req.user.userId || String(req.user.userRole) === "admin") {
            return req.status(401).json({message: "Unauthorized operation, the user logged is not the owner of the list"})
        }

        const trackIsInList = await LisInfo.find({idList: req.params.idList, idTrack: req.params.idTrack})
        if (trackIsInList) {
            return res.status(200).json({message: "Track deleted from list"})
        }

        res.status(404).json({message: "The track is not in the lsit" })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { createList, getMyLists, getUserPublicLists, getAllLists, updateList, deleteList, addTrackToList, removeTrackFromList }