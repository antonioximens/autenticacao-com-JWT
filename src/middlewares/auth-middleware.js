const jwt = require('jsonwebtoken')
const users = require('../models/usersModel')

// chave secreta para o JWT
const secretKey = 'mySecretKey'

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){ 
        return res.statu(401).json({ message: 'Authorization header is required'})
    }

    const token = authHeader.split(' ')[1]

    try {
        const decodedToken = jwt.verify(token, secretKey)

        const user = users.find(user => user.username === decodedToken.username)
        if (!user) {
          return res.status(401).json({ message: 'Invalid user' })
        }
    
        req.authenticatedUser = user
    
        next() 
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token'})
    }

    console.log(token)
    next()
}

module.exports = authMiddleware
