const express = require('express')
const usersModel = require('../models/usersModel')

// usnado um JWTb para autenticação
const jwt = require('jsonwebtoken')

// chave secreta para o JWT
const secretKey = 'mySecretKey'

const authRouter = express.Router()

authRouter.post('/register', (req, res) => {
    // obter dados dos corpo
    const {username, password} = req.body

    // Validar dados
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const newRegister = usersModel.find(user => user.username === username)

    if(newRegister){
        return res.status(409).json({ message: 'User already exists'})
    }

    const newUser = {username, password}
    usersModel.push(newUser)

    res.status(201).json({newUser})


})

authRouter.post('/login', (req, res) => {
    // obter dados dos corpo
    const {username, password} = req.body

    // Validar dados
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const user = usersModel.find(user => user.username === username)

    if(!user || user.password !== password){
        return res.status(401).json({ message: 'Invalid credentials'})
    }

    // criando um token
    const token = jwt.sign({ username }, secretKey, {expiresIn: '1h'})

    res.json({ token })
})

module.exports = authRouter