const bcrypt = require('bcrypt')
const pool = require("../config/dbConnexion")
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const login = (req.body?.login || '').trim()
        const username = (req.body.username || '').trim()
        const password = req.body?.password
        
        if (!login || !username || !password){
            console.log('Login, username or password is empty')
            return res.status(400).json({ message: 'Login, Username and Password are required to register'})
        }
        
        const result = await pool.query(`SELECT * FROM users WHERE users.login = $1`,[login])
        if(result.rows.length > 0) {
            return res.status(409).json({ message: 'Login already used'})
        }
        
        const encryptionAmount = 10
        const hashedPassword = await bcrypt.hash(password, encryptionAmount)
        
        const resultInsert = await pool.query(`INSERT INTO users (login, password, username) VALUES ($1, $2, $3) RETURNING id, admin`,[login, hashedPassword, username])
        const user = resultInsert.rows[0] 
        
        const token = jwt.sign(
            { id: user.id, role: user.admin },
            process.env.jwt_secret,
            { expiresIn: '24h' }
        )
        
        res.cookie('connexionToken', token, { 
            httpOnly: true, 
            sameSite: process.env.PRODUCTION_STATE ==='production' ? 'none' : 'strict', 
            secure: process.env.PRODUCTION_STATE === 'production' });
        return res.status(201).json({message: 'User successfuly created'})
    } catch (error) {
        console.error('register error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const login = async (req, res) => {
    try{
        const login = (req.body?.login || '').trim()
        const password = req.body?.password
        
        if (!login || !password){
            console.log('Login or password is empty')
            return res.status(400).json({ message: 'Login and Password are required to register'})
        }
        
        const user = await pool.query(`SELECT * FROM users WHERE users.login = $1`,[login])

        if(user.rows.length === 0) {
            return res.status(401).json({ message: 'No account found with this Login/password'})
        }

        const valid = await bcrypt.compare(password, user.rows[0].password)
        if(!valid) {
            return res.status(401).json({ message: 'No account found with this Login/password'})
        }        

        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].admin },
            process.env.jwt_secret,
            { expiresIn: '24h' }
        )
        
        res.cookie('connexionToken', token, { 
            httpOnly: true, 
            sameSite: process.env.PRODUCTION_STATE ==='production' ? 'none' : 'strict', 
            secure: process.env.PRODUCTION_STATE === 'production' });
        return res.status(201).json({message: 'Connexion successful'})
    } catch (error) {
        console.error('login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
}

module.exports = { register, login }