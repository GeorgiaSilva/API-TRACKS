require('./models/User')
require('./models/Track')


const express = require('express')
const { mongoose } = require('mongoose')
const mongosoe = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri ='mongodb+srv://<USER>:<PASSWORD>cluster0.wttw535.mongodb.net/?retryWrites=true&w=majority'
mongosoe.connect(mongoUri)

mongosoe.connection.on('connected', () => {
    console.log('connected to mongodb')
})
 
mongoose.connection.on('error', (err)=> {
    try{
        console.log('Error connecting to mongo ', err)
    }catch(err){
        console.error(err)
    }
    
})
app.get('/', requireAuth, (req,res)=>{
    res.send(`Your email: ${req.user.email}`)
}) 

app.listen(3000,()=>{
    console.log('ouvindo: 3000')
})