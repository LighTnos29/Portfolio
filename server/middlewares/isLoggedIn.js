const jwt = require("jsonwebtoken")

// Helper to add CORS headers (same as in index.js)
const addCorsHeaders = (req, res) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
        : ['http://localhost:5173', 'http://localhost:5174']
    
    const origin = req.headers.origin
    if (origin) {
        const normalizedOrigin = origin.trim().toLowerCase()
        const normalizedAllowed = allowedOrigins.map(o => o.trim().toLowerCase())
        if (normalizedAllowed.indexOf(normalizedOrigin) !== -1 || allowedOrigins.indexOf(origin) !== -1) {
            res.header('Access-Control-Allow-Origin', origin)
            res.header('Access-Control-Allow-Credentials', 'true')
        }
    }
}

const isLoggedIn = (req, res, next) => {
    if (!req.cookies.Token) {
        addCorsHeaders(req, res)
        return res.status(401).json({
            success: false,
            message: "Session expired , Please login again."
        })
    }
    try {
        const decode = jwt.verify(req.cookies.Token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        addCorsHeaders(req, res)
        return res.status(401).json({
            success: false,
            message: "Error occured, during login."
        })
    }
}

module.exports = isLoggedIn
