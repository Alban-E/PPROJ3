const Notification = require('../Models/Notification')
// #region notification CRUD
// CRUD OPERATIONS
// Create
const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create({
            userId: req.query.userId,
            content: req.body.content,
            type: req.body.type
        })
        
        return res.status(201).json({message: "Notification created successfuly", notification: notification})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Read
const getMyNotifications = async (req, res) => {
    try {
        const filter = { userId: req.user.userId }
        const { type } = req.query
        if (type){
            filter.type = type
        }        
        notifications = await Notification.find(filter)

        if(!notifications){
            return res.status(404).json({message: "No notifications found"})
        }

        return res.status(200).json({notifications})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getNotificationsByUser = async (req, res) => {
    try {
        const filter = { userId: req.query.userId }
        const { type } = req.query
        if (type){
            filter.type = type
        }        
        notifications = await Notification.find(filter)

        if(!notifications){
            return res.status(404).json({message: "No notifications found"})
        }

        return res.status(200).json({notifications})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getAllNotification = async (req, res) => {
    try {
        const filter = {}
        const { type } = req.query
        if (type){
            filter.type = type
        }        
        notifications = await Notification.find(filter)

        if(!notifications){
            return res.status(404).json({message: "No notifications found"})
        }

        return res.status(200).json({notifications})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteNotification = async (req, res) => {
    try {
        const notification = Notification.findById(req.query.notificationId)
        if(!notification){
            return res.status(404).json({message: "No notification found"})
        }

        await notification.deleteOne()
        return res.status(200).json({message: "Notification Successfully deleted"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.exports = { createNotification, getMyNotifications, getNotificationsByUser, getAllNotification, deleteNotification }