const express = require('express')
const recipesRouter = require('./api/recipes-router')

const server = express()
server.use(express.json())

server.use('/api/recipes', recipesRouter)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
