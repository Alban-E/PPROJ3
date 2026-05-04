const router = require('express').Router()
const {authenticateToken, assertUserIsAdmin} = require('../middlewares/authVerif')
// const {} = require('../controllers/listController')

// router.get('/lists/me', verifyAuth, getMyDefaultLists)
// router.get('/lists/user/:id', verifyAuth, getOtherPublicLists)
// router.post('/lists', verifyAuth, createList)
// router.put('/lists/:id', verifyAuth, modifyList)
// router.delete('/lists/:id', verifyAuth, deleteList)
// router.post('/lists/:id/track', verifyAuth, addTrackToList)
// router.delete('/lists/:id/track/:trackId', verifyAuth, removeTrackFromList)

module.exports = router