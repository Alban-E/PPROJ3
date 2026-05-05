const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => { 
    try {
        const token = req.cookies.connexionToken
        
        if (!token) {
            return res.status(401).json({message : "Invalid connexion token"})
        }

        const validToken = jwt.verify(token, process.env.JWT_SECRET)

        req.user = validToken
        
        next()
    } catch (error) {
        console.error('An error occured during the auth verification:', error);
        return res.status(500).json({ message: 'Internal server error' });
    } 
}

const assertUserIsAdmin = (req, res, next) => {
    switch (String(req.user.userRole)) {
        case "user":
            if (String(req.user.userId) !== String(req.params.id)) {
                return res.status(401).json({message: "Unauthorized operation"})
            }
            break
        case "admin":
            break
        default:
            return res.status(500).json({message: "Invalid user role", user: req.user})
    }
    next()
}

module.exports = {authenticateToken, assertUserIsAdmin}