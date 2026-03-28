const jwt = require("jsonwebtoken")
const addCorsHeaders = require('./corsHandler')

const isLoggedIn = (req, res, next) => {
    if (!req.cookies.Token) {
        addCorsHeaders(req, res)
        return res.status(401).json({
            success: false,
            message: "Session expired , Please login again."
        })
    }
    try {
        const decode = jwt.verify(req.cookies.Token, process.env.JWT_SECRET, { algorithms: ['HS256'] })
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
