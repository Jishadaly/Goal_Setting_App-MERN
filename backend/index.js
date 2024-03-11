const express = require('express')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middlware/errorMiddlware')
const connectDB = require('./config/dataBase')
const port = process.env.PORT || 5000 ;

connectDB()

const goulRouter = require('./routes/goalRoutes')
const userRouter = require('./routes/userRoutes')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.listen(port,()=> console.log( `sever start on port ${port}`))

app.use('/api/goals',goulRouter)
app.use('/api/users',userRouter)

app.use(errorHandler);