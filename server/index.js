const express = require('express')
const app  =  express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongooseConnection = require('./config/mongooseConnection')
const projectRouter = require('./routes/projectRouter')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Hello")
})
app.use("/project",projectRouter)

const PORT = process.env.PORT || 3000
console.log(`Server is running on ${PORT}`);

app.listen(3000)