const express = require('express')
const router = express.Router()
const {authenticateToken, assertUserIsAdmin} = require('../Middlewares/authVerif')
// const {validateBody, userSchema, userUpdateSchema} = require('../Middlewares/ValidateBody')
const { createUser, getAllUser, getUserById, updateUserById, deleteUserById, login } = require('../Controllers/userController')

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

module.exports = router