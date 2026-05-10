const Subscriber = require('../Models/Subscriber')

// #region subscriber CRUD
// CRUD OPERATIONS
// Create
const createSubscriber = (req, res) => {
    try {
        const subscriber = await Subscriber.create({
            subscriberId: req.user.userId,
            userId: req.params.userId,
        })
        
        return res.status(201).json({message: "Subscriber created successfuly", subscriber: subscriber})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Read
const getMySubscribers = (req, res) => {
    try {
        subscribers = await Subscriber.find({ userId: req.user.userId })

        if(!subscribers){
            return res.status(404).json({message: "No subscribers found"})
        }

        return res.status(200).json({subscribers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getMySubscriptions = (req, res) => {
    try {
        subscription = await Subscriber.find({ subscriberId: req.user.userId })

        if(!subscribers){
            return res.status(404).json({message: "No subscribers found"})
        }

        return res.status(200).json({subscribers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getSubscriberByUser = (req, res) => {
    try {
        subscribers = await Subscriber.find({ userId: req.params.userId })

        if(!subscribers){
            return res.status(404).json({message: "No subscribers found"})
        }

        return res.status(200).json({subscribers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUserSubscriptions = (req, res) => {
    try {
        subscription = await Subscriber.find({ subscriberId: req.params.userId })

        if(!subscribers){
            return res.status(404).json({message: "No subscribers found"})
        }

        return res.status(200).json({subscribers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getAllSubscribers = (req, res) => {
    try {
        subscribers = await Subscriber.find()

        if(!subscribers){
            return res.status(404).json({message: "No subscribers found"})
        }

        return res.status(200).json({subscribers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteSubscriber = (req, res) => {
    try {
        const subscriber = Subscriber.findById(req.params.subscriberId)
        if(!subscriber){
            return res.status(404).json({message: "No subscriber found"})
        }

        return res.status(200).json({message: "Subscriber Successfully deleted"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.exports = { createSubscriber, getMySubscribers, getMySubscriptions, getSubscriberByUser, getAllSubscribers, deleteSubscriber }