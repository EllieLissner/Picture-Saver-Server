require('dotenv').config()
const express = require('express')

let db = require('./models')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

//GET /user to view all of users saved images
/*
app.get('/', async (req, res) => {
    ?? is this needed on server side? def needed on FE
    need to send data to FE regarding the exact file location
    so they can send the request to S3
})
*/

//POST '/' this is where, when the image is sent to S3, we 
//save the author, location, and key, which are generated
//from the response from S3 and then saved to the 
//database
app.post('/', async (req, res) => {
    try{
        savedImage = await db.image.create({
            location: req.body.location,
            key: req.body.key,   
            user: req.body.author,
            userId: req.body.userId
        })
        res.send('Image Saved')
    } catch (error) {
        console.log(error)
    }
})

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})