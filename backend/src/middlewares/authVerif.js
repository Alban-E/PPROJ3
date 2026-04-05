const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => { 
    try {
        const token = req.cookies.connexionToken
        
        if (!token) {
            return res.status(401).json({message : "Invalid connexion token"})
        }

        const validToken = jwt.verify(token, process.env.jwt_secret)

        req.user = validToken
        
        next()
    } catch (error) {
        console.error('An error occured during the auth verification:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
}

module.exports = authMiddleware 