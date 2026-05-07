const Chat = require('../Models/Chat')

// #region CRUD
// CRUD OPERATIONS
// Create
const createChat = async (req, res) => {
    try {
        const existingChat = await Chat.findOne({$or: [
            { userId1: req.params.userId, userId2: req.user.userId },
            { userId1: req.user.userId, userId2: req.params.userId }
        ]})
        if (existingChat) {
            return res.status(409).json({message: "A chat between you and the otheer user already exist"})
        }

        const chat = await Chat.create({
            userId1: req.user.userId,
            userId1: req.params.userId,
        })

        res.status(201).json({message: 'Chat created', chat: chat })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getMyChats = async (req, res) => {
    try {
        const existingChat = await Chat.find({$or: [
            { userId1: req.user.userId },
            { userId2: req.user.userId }
        ]})
        
        if(!chats){
            return res.status(404).json({message: "No chat found between you and others users"})
        }
        
        return res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getChatWithUser = async (req, res) => {
    try {
        const existingChat = await Chat.findOne({$or: [
            { userId1: req.params.userId, userId2: req.user.userId },
            { userId1: req.user.userId, userId2: req.params.userId }
        ]})
        if (!existingChat) {
            return res.status(404).json({message: "There is no existing chat between you and to other user"})
        }
        
        return res.status(200).json(chats)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find()
        
        if(!chats){
            return res.status(404).json({message: "No chat found"})
        }
        
        return res.status(200).json(chats)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// No update on the chats 

// Delete maybe not needed ?
const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id)
        
        if (!chat) {
            return res.status(404).json({message: "Chat not found"})
        }
        
        if ((String(chat.userId1) === String(req.user.userId))  || String(chat.userId2) === String(req.user.userId) || (String(req.user.userRole) === 'admin')){
            await chat.deleteOne()
            return res.status(200).json({message: "Chat deleted successfully"})
        }
        
        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.export = { createChat, getMyChats, getChatWithUser, getAllChats, deleteChat }