const router = require('express').Router()
const verifyAuth = require('../middlewares/authVerif')
const {getMyProfile, getOtherProfile, modifyProfile} = require('../controllers/userController')

router.get('/users/me', verifyAuth, getMyProfile)
router.get('/users/:id', verifyAuth, getOtherProfile)
router.put('/modifyProfile', verifyAuth, modifyProfile)

module.exports = router