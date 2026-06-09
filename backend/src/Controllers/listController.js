const List = require('../Models/List')

// #region CRUD
// CRUD OPERATIONS
// Create
const createList = async (req, res) => {
    try {
        const listWithSameName = await List.findOne({name: req.body.listName, userId: req.user.userId})
        if (listWithSameName) {
            return res.status(409).json({message: `A list with the same name (${req.body.listName}) already exist`})
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
const getListById = async (req, res) => {
    try {
        const list = await List.findById(req.query.listId)

        if (!list){
            return res.status(404).json({message: "No list found"})
        }
   
        return res.status(200).json(list)        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getListByName = async (req, res) => {
    try {
        const lists = await List.find({name: new RegExp(req.query.listName, "i"), private: false})

        if (!lists){
            return res.status(404).json({message: "No list found"})
        }
   
        return res.status(200).json(lists)        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

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
        const lists = await List.find({userId: req.query.userid, private: false})
        
        if(!lists){
            return res.status(404).json({message: "No public list found"})
        }
        
        return res.status(200).json(lists)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUserLists = async (req, res) => {
    try {
        const lists = await List.find({userId: req.query.userId})
        
        if(!lists){
            return res.status(404).json({message: "No list found"})
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
        const list = await List.findById(req.body.listId)
        
        if (!list) {
            return res.status(404).json({message: "List not found"})
        }
        
        if ((String(list.userId) === String(req.user.userId)) || (String(req.user.userRole) === 'admin')){
            const {listName, private} = req.body;
            
            if (listName) {
                const existingName = await List.findOne({name: listName, userId: req.user.userId})
                if (!existingName) {
                    console.log("list name updated")
                    list.name = listName
                }
            }

            if (private !== undefined) {
                list.private = Boolean(private)
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
        const list = await List.findById(req.body.listId)
        
        if (!list) {
            return res.status(404).json({message: "List not found"})
        }
        
        if ((String(list.userId) === String(req.user.userId)) || (String(req.user.userRole) === 'admin')){
            await list.deleteOne()
            return res.status(200).json({message: "List deleted successfully"})
        }

        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion


module.exports = { createList, getListById, getListByName, getMyLists, getUserPublicLists, getUserLists, getAllLists, updateList, deleteList }