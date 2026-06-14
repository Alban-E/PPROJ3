const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createSignal, getSignalByUser, getAllSignals, deleteSignal, createBan, getBanByBanned, getBanByBanner, getAllBans, deleteBan, revokeBan } = require('../Controllers/moderationController')

//#region Signal CRUD
// Create
router.post('/signal', authenticateToken, createSignal)

// Read
router.get('/signaled', authenticateToken, assertUserIsAdmin, getSignalByUser)

router.get('/signal', authenticateToken, assertUserIsAdmin, getAllSignals)

// Delete
router.delete('/signal', authenticateToken, assertUserIsAdmin, deleteSignal)
//#endregion

//#region Ban CRUD
// Create
router.post('/ban', authenticateToken, assertUserIsAdmin, createBan)

// Read
router.get('/banned', authenticateToken, assertUserIsAdmin, getBanByBanned)
router.get('/banner', authenticateToken, assertUserIsAdmin, getBanByBanner)

router.get('/bans', authenticateToken, assertUserIsAdmin, getAllBans)

// Delete
router.delete('/ban', authenticateToken, assertUserIsAdmin, deleteBan)
//#endregion

router.put('/ban/revoke', authenticateToken, assertUserIsAdmin, revokeBan)


module.exports = router