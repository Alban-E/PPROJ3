const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createSignal, getSignalByUser, getAllSignals, deleteSignal, createBan, getBanByBanned, getBanByBanner, getAllBans, deleteBans, revokeBan } = require('../Controllers/ModerationController')

//#region Signal CRUD
// Create
router.post('/signal/:userId', authenticateToken, createSignal)

// Read
router.get('/signal/:userId', authenticateToken, getSignalByUser)

router.get('/signal/', authenticateToken, assertUserIsAdmin, getAllSignals)

// Delete
router.delete('/signal/:userId', authenticateToken, deleteSignal)
//#endregion

//#region Ban CRUD
// Create
router.post('/ban/:userId', authenticateToken, createBan)

// Read
router.get('/ban/banned/:userId', authenticateToken, assertUserIsAdmin, getBanByBanned)
router.get('/ban/banner/:userId', authenticateToken, assertUserIsAdmin, getBanByBanner)

router.get('/ban/', authenticateToken, assertUserIsAdmin, getAllBans)

// Delete
router.delete('/ban/:userId', authenticateToken, deleteBans)
//#endregion

router.put('/ban/revoke/:banId', authenticateToken, revokeBan)


module.exports = router