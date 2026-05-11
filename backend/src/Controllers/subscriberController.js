const Subscriber = require('../Models/Subscriber')

// #region subscriber CRUD
// CRUD OPERATIONS
// Create
const createSubscriber = async (req, res) => {
    try {
        const subscriber = await Subscriber.create({
            subscriberId: req.user.userId,
            userId: req.query.userId,
        })
        
        return res.status(201).json({message: "Subscriber created successfuly", subscriber: subscriber})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Read
const getMySubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({ userId: req.user.userId })

        if(!subscribers){
            return res.status(404).json({message: "No subscribers found"})
        }

        return res.status(200).json({subscribers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getMySubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscriber.find({ subscriberId: req.user.userId })

        if(!subscriptions){
            return res.status(404).json({message: "No subscription found"})
        }

        return res.status(200).json({subscription: subscriptions})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getSubscriberByUser = async (req, res) => {
    try {
        const subscribers = await Subscriber.find({ userId: req.query.userId })

        if(!subscribers){
            return res.status(404).json({message: "No subscriber found"})
        }

        return res.status(200).json({subscribers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getSubscriptionsByUser = async (req, res) => {
    try {
        const subscriptions = await Subscriber.find({ subscriberId: req.query.userId })

        if(!subscriptions){
            return res.status(404).json({message: "No subscription found"})
        }

        return res.status(200).json({subscription: subscriptions})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getAllSubscribers = async (req, res) => {
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
const deleteSubscriber = async (req, res) => {
    try {
        const subscriber = Subscriber.findById(req.query.subscriberId)
        if(!subscriber){
            return res.status(404).json({message: "No subscriber found"})
        }

        await subscriber.deleteOne()
        return res.status(200).json({message: "Subscriber Successfully deleted"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.exports = { createSubscriber, getMySubscribers, getMySubscriptions, getSubscriberByUser, getSubscriptionsByUser, getAllSubscribers, deleteSubscriber }