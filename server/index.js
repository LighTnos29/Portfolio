const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const mongoose = require('mongoose')
require('dotenv').config()
const mongooseConnection = require('./config/mongooseConnection')
const projectRouter = require('./routes/projectRouter')
const adminRouter = require('./routes/adminRouter')
const addCorsHeaders = require('./middlewares/corsHandler')

const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
    : ['http://localhost:5173', 'http://localhost:5174']

if (process.env.NODE_ENV !== 'production') console.log('CORS Allowed Origins:', allowedOrigins)

const isOriginAllowed = (origin) => {
    if (!origin) return false
    const normalizedOrigin = origin.trim().toLowerCase()
    const normalizedAllowed = allowedOrigins.map(o => o.trim().toLowerCase())
    return normalizedAllowed.indexOf(normalizedOrigin) !== -1 || allowedOrigins.indexOf(origin) !== -1
}

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (isOriginAllowed(origin)) {
            callback(null, true)
        } else {
            if (process.env.NODE_ENV !== 'production') console.log('CORS blocked origin:', origin)
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400
}

// Security headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow images to load cross-origin
    contentSecurityPolicy: false, // managed by frontend (Vercel)
}))

app.use(cors(corsOptions))

// Rate limiters
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: { success: false, message: 'Too many login attempts. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
})

const trackingLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30,
    message: { success: false, message: 'Too many requests.' },
    standardHeaders: true,
    legacyHeaders: false,
})

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: { success: false, message: 'Too many requests. Please slow down.' },
    standardHeaders: true,
    legacyHeaders: false,
})

app.use((req, res, next) => {
    const originalJson = res.json.bind(res)
    res.json = function (data) {
        addCorsHeaders(req, res)
        return originalJson(data)
    }

    const originalSend = res.send.bind(res)
    res.send = function (data) {
        addCorsHeaders(req, res)
        return originalSend(data)
    }

    const originalStatus = res.status.bind(res)
    res.status = function (code) {
        addCorsHeaders(req, res)
        return originalStatus(code)
    }

    if (req.method === 'OPTIONS') {
        addCorsHeaders(req, res)
        res.header('Access-Control-Max-Age', '86400')
        return res.status(204).send()
    }

    addCorsHeaders(req, res)
    next()
})

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

app.use('/uploads', express.static('public/uploads'))

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/health', (req, res) => {
    addCorsHeaders(req, res)
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        dbConnected: mongoose.connection.readyState === 1
    })
})

app.use("/project", apiLimiter, projectRouter)
app.use("/admin/login", loginLimiter)
app.use("/admin/track-visit", trackingLimiter)
app.use("/admin/track-project-view", trackingLimiter)
app.use("/admin", adminRouter)

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'production') console.error('Global error handler:', err);
    addCorsHeaders(req, res)
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: 'Internal server error'
    });
});

app.use((req, res) => {
    addCorsHeaders(req, res)
    res.status(404).json({
        success: false,
        message: 'Not found'
    });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') console.log(`Server running on port ${PORT}`)
})
