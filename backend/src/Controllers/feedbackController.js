const Feedback = require('../Models/Feedback')

// #region CRUD
// CRUD OPERATIONS
// Create
const createFeedback = async (req, res) => {
    try {
        const existingFeedback = await Feedback.findOne({gameId: req.body.gameId, userId: req.user.userId})
        if (existingFeedback) {
            return res.status(409).json({message: "The user already leaved a feedback on this game"})
        }

        const feedback = await Feedback.create({
            rating: req.body.rating,
            comment: req.body.comment,
            gameId: req.body.gameId,
            userId: req.user.userId
        })

        res.status(201).json({message: 'Feedback created', feedback: feedback })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getMyFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({userId: req.user.userId})
        
        if(!feedbacks){
            return res.status(404).json({message: "No feedback found"})
        }
        
        return res.status(200).json(feedbacks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUserFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find({userId: req.query.userId})
        
        if(!feedbacks){
            return res.status(404).json({message: "No feedback found from the user"})
        }
        
        return res.status(200).json(feedbacks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getGameFeedbacks = async (req, res) => {
        try {
        const feedbacks = await Feedback.find({gameId: req.query.gameId})
        
        if(!feedbacks){
            return res.status(404).json({message: "No feedback found from the user"})
        }
        
        return res.status(200).json(feedbacks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const getMyGameFeedback  = async (req, res) => {
        try {
        const feedbacks = await Feedback.find({userId: req.query.userId, gameId: req.query.gameId})
        
        if(!feedbacks){
            return res.status(404).json({message: "No feedback found from the user"})
        }
        
        return res.status(200).json(feedbacks)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
        
        if(!feedbacks){
            return res.status(404).json({message: "No feedback found"})
        }
        
        return res.status(200).json(feedbacks)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Update
const updateFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.body.feedbackId)
        
        if (!feedback) {
            return res.status(404).json({message: "Feedback not found"})
        }
        
        if ((feedback.userId === req.user.userId) || (req.user.userRole === 'admin')){
            const {rating, comment, liked} = req.body;
            
            if (rating) {
                feedback.rating = Number(rating)
            }
            if (comment) {
                feedback.comment = comment
            }
            if (liked) {
                feedback.liked = Boolean(liked)
            }
            
            await feedback.save();
            return res.status(200).json({message: "Feedback updated"})
        }
        
        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteFeedback = async (req, res) => {
    try {
        const { feedbackId } = req.params
        const feedback = await Feedback.findById(feedbackId)
        
        if (!feedback) {
            return res.status(404).json({message: "Feedback not found"})
        }
        
        if ((String(feedback.userId) === req.user.userId) || (req.user.userRole === 'admin')){
            await feedback.deleteOne()
            return res.status(200).json({message: "Feedback deleted successfully"})
        }
        
        return res.status(403).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.exports = { createFeedback, getMyFeedbacks, getUserFeedbacks, getGameFeedbacks, getMyGameFeedback, getAllFeedbacks, updateFeedback, deleteFeedback }