require('dotenv').config()
const express = require('express')

let db = require('./models')
const app = express()
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})