const pool = require("../config/dbConnexion")
const bcrypt = require('bcrypt')

const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const result = await pool.query(`SELECT id, username, avatar_url, bio, is_private, admin FROM users WHERE id = $1`,[userId]);
        
        res.json(result.rows[0])
    } catch (error) {
        console.error('Error from the db call:', error);
        return res.status(500).json({ message: 'Error from the db call' });
    }
}

const getOtherProfile = async (req, res) => {
    try {
        const userId = req.params.id
        const result = await pool.query(`SELECT id, username, avatar_url, bio, is_private, admin FROM users WHERE id = $1`,[userId]);

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error from the db call:', error);
        return res.status(500).json({ message: 'Error from the db call' });
    }
}

const modifyProfile = async (req, res) => {
    try {
        const userId = req.user.id

        const fields = []
        const values = []

        if (req.body.login) {
            fields.push(`login = $${fields.length + 1}`)
            values.push(req.body.login)
        }
        if (req.body.password) {
            fields.push(`password = $${fields.length + 1}`)
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            values.push(hashedPassword)
        }
        if (req.body.username) {
            fields.push(`username = $${fields.length + 1}`)
            values.push(req.body.username)
        }
        if (req.body.avatarUrl) {
            fields.push(`avatar_url = $${fields.length + 1}`)
            values.push(req.body.avatarUrl)
        }
        if (req.body.bio) {
            fields.push(`bio = $${fields.length + 1}`)
            values.push(req.body.bio)
        }
        if (req.body.isPrivate) {
            fields.push(`is_private = $${fields.length + 1}`)
            values.push(req.body.isPrivate)
        }
        
        if (fields.length===0) {
            return res.status(400).json({message: 'invalid values entered'})
        }
        const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${values.length}`
        values.push(userId)
        await pool.query(query,values)

        // return res with the success value
        return res.status(200).json({message: "Successful modifications"})
    } catch (error) {
        console.error('Error from the db call:', error);
        return res.status(500).json({ message: 'Error from the db call' });
    }
}

module.exports = {getMyProfile, getOtherProfile, modifyProfile}