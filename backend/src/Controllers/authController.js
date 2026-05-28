require("dotenv").config()
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login })
        if (!user || (req.body.password?.length ?? 0) < 4 || !(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(404).json({message: 'Invalid email or password'})
        }
        
        const token = jwt.sign(
            { userId: user._id, email: user.email, username: user.username, userRole: user.role },
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

const logWithGoogle = (req, res) => {
    const token = jwt.sign(
        { userId: req.user._id, email: req.user.login, username: req.user.username, userRole: 'user' },
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

    res.redirect(`http://localhost:${process.env.FRONTEND_PORT}/Account`)
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

module.exports = { login, logout, logWithGoogle}