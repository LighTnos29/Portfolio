const jwt = require("jsonwebtoken")

const isLoggedIn = (req, res, next) => {
    if (!req.cookies.Token) {
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
        return res.status(401).json({
            success: false,
            message: "Error occured, during login."
        })
    }
}

module.exports = isLoggedIn
