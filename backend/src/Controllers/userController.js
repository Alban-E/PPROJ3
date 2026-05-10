require("dotenv").config()
const User = require('../Models/User')
const List = require('../Models/List')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

        const listsToCreate = [ "A écouter", "Ecoutées", "Aimée" ]
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
const getAllUser = async (req, res) => {
    try {
        const user = await User.find()
        
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
            const users = await User.findById(req.params.id)
            
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

const login = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login })
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(404).json({message: 'Invalid email or password'})
        }
        
        const token = jwt.sign(
            { userId: user._id, email: user.email, userRole: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        
        res.cookie('connexionToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 1 jour
            path: '/'
            })
            
        return res.status(200).json({message: "Login success" })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const logout = (req, res) => {
    res.clearCookie('connexionToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/'
    })
    return res.status(200).json({ message: 'Logged out' })
}

module.exports = { createUser, getAllUser, getUserById, updateUserById, deleteUserById, login, logout }