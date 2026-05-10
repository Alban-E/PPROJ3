const Chat = require('../Models/Chat')
const ChatMessage = require('../Models/ChatMessage')
const User = require('../Models/User')

// #region General Chat CRUD
// CRUD OPERATIONS
// Create
const createChat = async (req, res) => {
    try {
        const existingChat = await Chat.findOne({$or: [
            { userId1: req.query.userId, userId2: req.user.userId },
            { userId1: req.user.userId, userId2: req.query.userId }
        ]})
        if (existingChat) {
            return res.status(409).json({message: "A chat between you and the other user already exist"})
        }

        const chat = await Chat.create({
            userId1: req.user.userId,
            userId2: req.query.userId,
        })

        res.status(201).json({message: 'Chat created', chat: chat })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getMyChats = async (req, res) => {
    try {
        const chat = await Chat.find({$or: [
            { userId1: req.user.userId },
            { userId2: req.user.userId }
        ]})
        
        if(!chat){
            return res.status(404).json({message: "No chat found between you and others users"})
        }
        
        return res.status(200).json(chat)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getChatWithUser = async (req, res) => {
    try {
        const chat = await Chat.findOne({$or: [
            { userId1: req.query.userId, userId2: req.user.userId },
            { userId1: req.user.userId, userId2: req.query.userId }
        ]})
        if (!chat) {
            return res.status(404).json({message: "There is no existing chat between you and to other user"})
        }
        
        return res.status(200).json(chat)
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

// Delete maybe not needed ?
const deleteChat = async (req, res) => {
    try {
        const chat = await Chat.findById(req.query.chatId)
        
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

// #region Chat message CRUD
// CRUD OPERATIONS
// Create
const createMessage = async (req, res) => {
    try {
        const existingChat = await Chat.findById(req.query.chatId)
        if (!existingChat) {
            return res.status(404).json({message: "No chat found with this id"})
        }

        const chatMessage = await ChatMessage.create({
            chatId: req.query.chatId,
            senderId: req.user.userId,
            content: req.body.content
        })

        res.status(201).json({message: 'Chat message created', chat: chatMessage })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getMessagesFromChat = async (req, res) => {
    try {
        const existingChat = await Chat.findById(req.query.chatId)
        if (!existingChat) {
            return res.status(404).json({message: "No chat found with this id"})
        }

        const messages = await ChatMessage.find({chatId: req.query.chatId})
        if (!messages) {
            return res.status(404).json({message: "No message found in this chat"})
        }
                
        return res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getMessagesFromUser = async (req, res) => {
    try {
        const messages = await ChatMessage.find({senderId: req.query.userId})
        if (!messages) {
            return res.status(404).json({message: "No message found from this user"})
        }
                
        return res.status(200).json(messages)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const GetAllMessages = async (req, res) => {
    try {
        const messages = await ChatMessage.find()
        
        if(!messages){
            return res.status(404).json({message: "No chat messages found"})
        }
        
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Update 
const UpdateMessage = async (req, res) => {
    try {
        const message = await ChatMessage.findById(req.query.messageId)
        
        if(!message){
            return res.status(404).json({message: "No message found"})
        }

        const { content } = req.body

        if (content) {
            message.content = content
        }
        
        await message.save()
        return res.status(200).json(message)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteMessage = async (req, res) => {
    try {
        const message = await ChatMessage.findById(req.query.messageId)
        
        if(!message){
            return res.status(404).json({message: "No message found"})
        }
        
        if ((String(message.senderId) === String(req.user.userId)) || (String(req.user.userRole) === 'admin')){
            await message.deleteOne()
            return res.status(200).json({message: "Chat deleted successfully"})
        }
        
        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.exports = { createChat, getMyChats, getChatWithUser, getAllChats, deleteChat, createMessage, getMessagesFromChat, getMessagesFromUser, GetAllMessages, UpdateMessage, deleteMessage }