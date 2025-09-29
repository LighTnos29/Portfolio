const express = require('express')
const app  =  express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongooseConnection = require('./config/mongooseConnection')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(3000)