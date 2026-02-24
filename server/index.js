const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const mongooseConnection = require('./config/mongooseConnection')
const projectRouter = require('./routes/projectRouter')
const adminRouter = require('./routes/adminRouter')

// CORS configuration - supports both development and production
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'http://localhost:5174'] // Default to localhost for development

// Log allowed origins on startup
console.log('CORS Allowed Origins:', allowedOrigins)

// CORS configuration with explicit handling
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests, or same-origin)
        if (!origin) return callback(null, true)

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            // Log for debugging
            console.log('CORS blocked origin:', origin)
            console.log('Allowed origins:', allowedOrigins)
            callback(new Error(`Not allowed by CORS. Origin: ${origin} not in allowed list.`))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400 // Cache preflight requests for 24 hours
}

// Apply CORS middleware (handles OPTIONS preflight automatically)
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Serve uploaded images
app.use('/uploads', express.static('public/uploads'))

app.get('/', (req, res) => {
    res.send("Hello")
})

// Project routes (public read + protected write)
app.use("/project", projectRouter)

// Admin routes
app.use("/admin", adminRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
