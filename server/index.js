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

// Helper function to check if origin is allowed
const isOriginAllowed = (origin) => {
    if (!origin) return false
    const normalizedOrigin = origin.trim().toLowerCase()
    const normalizedAllowed = allowedOrigins.map(o => o.trim().toLowerCase())
    return normalizedAllowed.indexOf(normalizedOrigin) !== -1 || allowedOrigins.indexOf(origin) !== -1
}

// Helper function to add CORS headers to response
const addCorsHeaders = (req, res) => {
    const origin = req.headers.origin
    if (origin && isOriginAllowed(origin)) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Credentials', 'true')
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        res.header('Access-Control-Expose-Headers', 'Set-Cookie')
    }
}

// CORS configuration with explicit handling
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests, or same-origin)
        if (!origin) return callback(null, true)

        if (isOriginAllowed(origin)) {
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

// Apply CORS middleware BEFORE other middleware (handles OPTIONS preflight automatically)
app.use(cors(corsOptions))

// Intercept all responses to ensure CORS headers are always present
app.use((req, res, next) => {
    // Store original json method
    const originalJson = res.json.bind(res)

    // Override json to always add CORS headers
    res.json = function (data) {
        addCorsHeaders(req, res)
        return originalJson(data)
    }

    // Store original send method
    const originalSend = res.send.bind(res)

    // Override send to always add CORS headers
    res.send = function (data) {
        addCorsHeaders(req, res)
        return originalSend(data)
    }

    // Handle OPTIONS requests explicitly
    if (req.method === 'OPTIONS') {
        addCorsHeaders(req, res)
        res.header('Access-Control-Max-Age', '86400')
        return res.status(204).send()
    }

    // Add CORS headers immediately for all requests
    addCorsHeaders(req, res)
    next()
})

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

// Global error handler - ensures CORS headers are always sent
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);

    // Always set CORS headers on errors
    addCorsHeaders(req, res)

    // Send error response
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || 'Internal server error',
        error: process.env.NODE_ENV === 'production' ? undefined : err.stack
    });
});

// 404 handler
app.use((req, res) => {
    // Always set CORS headers for 404
    addCorsHeaders(req, res)

    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path
    });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(`CORS Allowed Origins:`, allowedOrigins)
})
