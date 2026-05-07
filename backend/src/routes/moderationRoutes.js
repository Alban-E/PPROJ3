const router = require('express').Router()
const { authenticateToken, assertUserIsAdmin } = require('../Middlewares/authVerif')
const { createSignal, getSignalByUser, getAllSignals, deleteSignal, createBan, getBanByUser, getAllBans, deleteBans } = require('../Controllers/ModerationController')

//#region Signal CRUD
// Create
router.post('/:userId', authenticateToken, createSignal)

// Read
router.get('/:userId', authenticateToken, getSignalByUser)

router.get('/', authenticateToken, assertUserIsAdmin, getAllSignals)

// Delete
router.delete('/:userId', authenticateToken, deleteSignal)
//#endregion

//#region Ban CRUD
// Create
router.post('/:userId', authenticateToken, createBan)

// Read
router.get('/:userId', authenticateToken, getBanByUser)

router.get('/', authenticateToken, assertUserIsAdmin, getAllBans)

// Delete
router.delete('/:userId', authenticateToken, deleteBans)
//#endregion



module.exports = router