const express = require('express')
const { connect } = require('./db')
const authMiddle = require('./middlewere/auth.middle')
const noteRoute = require('./routes/notes.route')
const userRoute = require('./routes/user.route')
const cors = require('cors')
require('dotenv').config()

const app = express()

// global middleweres---------------
app.use(express.json())
app.use(cors())

// routes--------------------------
// route-1
app.use('/auth',userRoute)

// middlewere for notes route
app.use(authMiddle)
// route-2
app.use('/notes',noteRoute)

// run http server-------------------

app.listen(process.env.PORT,async()=>{
    try{
        await connect
        console.log('connected db')

    }catch(err){
        console.log('not-connected')
        console.log(err)

    }
    console.log('port 4500 running')
})