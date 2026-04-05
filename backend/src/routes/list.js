const router = require('express').Router()
const verifyAuth = require('../middlewares/authVerif')
const {getMyDefaultLists, getOtherPublicLists, createList, modifyList, deleteList, addTrackToList, removeTrackFromList} = require('../controllers/listController')

router.get('/lists/me', verifyAuth, getMyDefaultLists)
router.get('/lists/user/:id', verifyAuth, getOtherPublicLists)
router.post('/lists', verifyAuth, createList)
router.put('/lists/:id', verifyAuth, modifyList)
router.delete('/lists/:id', verifyAuth, deleteList)
router.post('/lists/:id/track', verifyAuth, addTrackToList)
router.delete('/lists/:id/track/:trackId', verifyAuth, removeTrackFromList)

module.exports = router