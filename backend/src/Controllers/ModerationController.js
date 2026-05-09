const Signal = require('../Models/Signal')
const Ban = require('../Models/Ban')

// #region Signal CRUD
// CRUD OPERATIONS
// Create
const createSignal = (req, res) => {
    try {
        const alreadySignal = Signal.find({ suspectUserID: req.body.suspectUserID, signalerId: req.user.userId })
        if(alreadySignal){
            return res.status(409).json({message: "You already signaled this user"})
        }

        const signal = await Signal.create({
            suspectUserID: req.body.suspectUserID,
            signalerId: req.user.userId,
            feedbakcId: req.body.feedbakcId,
            messageId: req.body.messageId,
            cause: req.body.cause
        })
        
        return res.status(201).json({message: "User successfully signaled"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Read
const getSignalByUser = (req, res) => {
    try {
        const signal = Signal.find({ suspectUserID: req.body.suspectUserID })
        if(!signal){
            return res.status(404).json({message: "This user has not been signaled (yet?)"})
        }

        return res.status(200).json({signal})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getAllSignals = (req, res) => {
    try {
        const signals = Signal.find()
        if(!signals){
            return res.status(404).json({message: "No signals found"})
        }

        return res.status(200).json({signals})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Delete
const deleteSignal = (req, res) => {
    try {
        const signal = Signal.findById(req.body.signalId)
        if(!signal){
            return res.status(404).json({message: "No signal found"})
        }

        return res.status(200).json({message: "Signal Successfully deleted"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
//#endregion

// #region Ban CRUD
// CRUD OPERATIONS
// Create
const createBan = (req, res) => {
    try {
        const ban = await Ban.create({
            bannedId: req.body.suspectUserID,
            bannerId: req.user.userId,
            banReason: req.body.feedbakcId,
        })
        
        return res.status(201).json({message: "User successfully banned"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// Read
const getBanByBanned = (req, res) => {
    try {
        const ban = Ban.find({ bannedId: req.params.userId })
        if(!ban){
            return res.status(404).json({message: "This user has not been banned (yet?)"})
        }

        return res.status(200).json({ban: ban})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getBanByBanner = (req, res) => {
    try {
        const ban = Ban.find({ bannerId: req.params.userId })
        if(!ban){
            return res.status(404).json({message: "This user has not banned anyone (yet?)"})
        }

        return res.status(200).json({signal: ban})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
const getAllBans = (req, res) => {
    try {
        const bans = Ban.find()
        if(!bans){
            return res.status(404).json({message: "No ban found"})
        }

        return res.status(200).json({bans: bans})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

// Delete
const deleteBans = (req, res) => {
    try {
        const bans = Ban.find()
        if(!bans){
            return res.status(404).json({message: "No ban found"})
        }

        return res.status(200).json({bans: bans})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}
//#endregion

const revokeBan = (req, res) => {
        try {
        const ban = Ban.findById(req.params.banId)
        if(!bans){
            return res.status(404).json({message: "No ban found"})
        }
        
        ban.active = false
        
        await ban.save()
        return res.status(200).json({message: "Ban successfully revoked", bans: bans})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

module.exports = { createSignal, getSignalByUser, getAllSignals, deleteSignal, createBan, getBanByBanned, getBanByBanner, getAllBans, deleteBans, revokeBan }