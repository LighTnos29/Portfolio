const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'portfolio'

mongoose
.connect(`${MONGODB_URI}/${DB_NAME}`)
.then(function() {
    console.log("Connected to MongoDB")
})
.catch(function (err) {
    console.error("MongoDB connection error:", err)
    process.exit(1) // Exit process if DB connection fails
})