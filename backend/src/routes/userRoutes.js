const express = require('express')
const router = express.Router()
const {authenticateToken, assertUserIsAdmin} = require('../Middlewares/authVerif')
const { createUser, getAllUser, getUserById, updateUserById, deleteUserById, login, logout } = require('../Controllers/userController')

//#region CRUD
// Create
router.post('/register',  createUser )

// Read
router.get('/', authenticateToken, assertUserIsAdmin, getAllUser)

router.get('/:id', authenticateToken, getUserById)

// Update
router.put('/:id', authenticateToken, updateUserById)

// Delete
router.delete('/:id', authenticateToken, deleteUserById)
//#endregion

router.post('/login', login)

router.post('/logout', authenticateToken, logout)

module.exports = router