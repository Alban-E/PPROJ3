require("dotenv").config()
const User = require('../Models/User')
const List = require('../Models/List')
const bcrypt = require('bcrypt')

// #region CRUD
// CRUD OPERATIONS
// Create
const createUser = async (req, res) => {
    try {
        const existingUserLogin = await User.findOne({ login: req.body.login })
        const existingUsername = await User.findOne({ username: req.body.username })    
        if (existingUserLogin || existingUsername) {
            return res.status(409).json({message: 'Login or username already used'})
        }

        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password,10)


        const content = {
            login: req.body.login,
            password: hashedPassword,
            oauth_provider: "",
            oauth_id: "",
            username: req.body.username,
        }

        if (String(req.query.admin) === process.env.CREATE_ADMIN_ACOUNT)
        {
            content.role = "admin"
            console.log("User Created as admin")
        }

        const user = await User.create(content)

        const listsToCreate = [ "A Jouer", "Terminé(s)", "Favoris" ]
        for (const name of listsToCreate) {
            await List.create({
                userId: user.id,
                name: name,
            })
        }

        res.status(201).json({
            message: 'User created',
            user: { id: user._id, login: user.login, username: user.username, role: user.role }
    })} catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Read
const getMyprofile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId, {password: 0, oauth_provider: 0, oauth_id: 0, role: 0})
        
        if(!user){
            return res.status(404).json({message: "No user found"})
        }
        
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getAllUser = async (req, res) => {
    try {
        const user = await User.find({}, {password: 0, oauth_provider: 0, oauth_id: 0, role: 0})
        
        if(!user){
            return res.status(404).json({message: "No user found"})
        }
        
        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getUserById = async (req, res) => {
    if ((req.user.userRole === 'admin') || (req.params.id === req.user.userId )){
        try {
            const users = await User.findById(req.params.id, {password: 0, oauth_provider: 0, oauth_id: 0, role: 0})
            
            if(!users){
                return res.status(404).json({message: "No user found"})
            }
            
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    return res.status(401).json({message: "Unauthorized operation"})
}

// Update
const updateUserById = async (req, res) => {
    if ((req.user.userRole === 'admin') || (req.params.id === req.user.userId )){
        try {
            const user = await User.findById(req.params.id)

            if (!user) {
                return res.status(404).json({message: "User not found"})
            }

            const {login, password, username, avatar_url, bio, is_private, role} = req.body;

            if (login) {
                user.login = login
            }
            if (password) {
                const hashedPassword = await bcrypt.hash(password,10)
                user.password = hashedPassword
            }
            if (username) {
                user.username = username
            }
            if (avatar_url) {
                user.avatar_url = avatar_url
            }
            if (bio) {
                user.bio = Boolean(bio)
            }
            if (is_private) {
                user.is_private = is_private
            }
            if (role) {
                user.role= String(role) === "NewAdminRole"? "admin" : "user"
            }

            await user.save();

            return res.status(200).json({message: "User updated"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    return res.status(401).json({message: "Unauthorized operation"})
}

// Delete
const deleteUserById = async (req, res) => {
    if ((req.user.userRole === 'admin') || (req.params.id === req.user.userId )){
        try {
            const user = await User.findById(req.params.id)
            
            if (!user) {
                return res.status(404).json({message: "User not found"})
            }

            await user.deleteOne()
            return res.status(200).json({message: "User deleted successfully"})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
    return res.status(401).json({message: "Unauthorized operation"})
}
//#endregion


module.exports = { createUser, getMyprofile, getAllUser, getUserById, updateUserById, deleteUserById }