// CORS helper - ensures headers are always added
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
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
            res.header('Access-Control-Expose-Headers', 'Set-Cookie')
        }
    }
}

module.exports = addCorsHeaders
