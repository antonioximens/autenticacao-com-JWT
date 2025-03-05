const express = require('express')
const authRouter = require('./routes/auth')
const protectedRouter = require('./routes/protected')

const app = express()

app.use(express.json())

// usando rotas
app.use('/auth', authRouter)
app.use('/protected', protectedRouter)

app.listen(3000, () => console.log('Servidor iniciado!\n http://localhost:3000'))