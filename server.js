require('dotenv').config()
const express = require('express')
const cors = require('cors')

let db = require('./models')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

//GET /user to view all of users saved images

app.get('/', async (req, res) => {
   try {
       const images = await db.image.findAll()
       const imagesWithLocation = images.filter((img)=> img.location)
       res.send(imagesWithLocation)

   }catch(error){
       console.log(error)
       res.status(500).send(error)
   }
})


//POST '/' this is where, when the image is sent to S3, we 
//save the author, location, and key, which are generated
//from the response from S3 and then saved to the 
//database
app.post('/', async (req, res) => {
    try{
        await db.image.create({
            location: req.body.location,
            key: req.body.key,   
            user: req.body.author,
            userId: req.body.userId
        })
        res.send('Image Saved')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`)
})