const Feedback = require('../Models/Feedback')
const FeedbackComment = require('../Models/FeedbackComment')

// #region CRUD
// CRUD OPERATIONS
// Create
const createFeedbackComment = async (req, res) => {
    try {
        const feedbackComment = await FeedbackComment.create({
            originalFeedbackId: req.params.feedbackId,
            comment: req.body.comment,
        })

        res.status(201).json({message: 'Feedback comment created', feedback: feedbackComment })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getFeedbackCommentByFeedbackId = async (req, res) => {
    try {
        const feedbackComments = await FeedbackComment.find({originalFeedbackId: req.params.feedbackId})
        
        if(!feedbackComments){
            return res.status(404).json({message: "No feedback comment found on this feedback"})
        }
        
        return res.status(200).json(feedbackComments)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUserFeedbackComment = async (req, res) => {
    try {
        const feedbackComments = await FeedbackComment.find({userId: req.query.userId})
        
        if(!feedbackComments){
            return res.status(404).json({message: "No feedback comment found from the user"})
        }
        
        return res.status(200).json(feedbackComments)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getAllFeedBackComment = async (req, res) => {
    try {
        const feedbackComments = await FeedbackComment.find()
        
        if(!feedbackComments){
            return res.status(404).json({message: "No feedback comment found"})
        }
        
        return res.status(200).json(feedbackComments)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Update
const updateFeedbackComment = async (req, res) => {
    try {
        const feedbackComment = await FeedbackComment.findById(req.params.id)
        
        if (!feedbackComment) {
            return res.status(404).json({message: "Feedback comment not found"})
        }
        
        if ((feedbackComment.userId === req.user.userId) || (req.user.userRole === 'admin')){
            const { comment } = req.body;
            
            if (comment) {
                feedbackComment.comment = comment
            }
            
            await feedbackComment.save();
            return res.status(200).json({message: "Feedback comment updated"})
        }
        
        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteFeedbackComment = async (req, res) => {
    try {
        const feedbackComment = await FeedbackComment.findById(req.params.id)
        
        if (!feedbackComment) {
            return res.status(404).json({message: "Feedback comment not found"})
        }
        
        if ((String(feedbackComment.userId) === String(req.user.userId)) || (String(req.user.userRole) === "admin")){
            await feedbackComment.deleteOne()
            return res.status(200).json({message: "Feedback comment deleted successfully"})
        }
        
        return res.status(401).json({message: "Unauthorized operation"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

module.exports = { createFeedbackComment, getFeedbackCommentByFeedbackId, getUserFeedbackComment, getAllFeedBackComment, updateFeedbackComment, deleteFeedbackComment }