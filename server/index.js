const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config()
const mongooseConnection = require('./config/mongooseConnection')
const projectRouter = require('./routes/projectRouter')
const adminRouter = require('./routes/adminRouter')
const isLoggedIn = require('./middlewares/isLoggedIn')
const trackVisit = require('./middlewares/trackVisit')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("Hello")
})

// Protected routes with visit tracking
app.use("/project", isLoggedIn, trackVisit, projectRouter)
app.use("/admin", adminRouter)


const PORT = process.env.PORT || 3000
console.log(`Server is running on ${PORT}`);

app.listen(3000)
