const express = require('express')
const router = express.Router()
const {authenticateToken, assertUserIsAdmin} = require('../Middlewares/authVerif')
const { createUser, getMyprofile, getAllUser, getUserById, updateUserById, deleteUserById } = require('../Controllers/userController')

//#region CRUD
// Create
router.post('/register',  createUser )

// Read
router.get('/me', authenticateToken, getMyprofile)

router.get('/', authenticateToken, assertUserIsAdmin, getAllUser)

router.get('/:id', authenticateToken, getUserById)

// Update
router.put('/:id', authenticateToken, updateUserById)

// Delete
router.delete('/:id', authenticateToken, deleteUserById)
//#endregion


module.exports = router