const express = require('express')
const { login, logout } = require('../controllers/authController')
const { getAnalytics, trackProjectView, trackPageVisit } = require('../controllers/analyticsController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

// Debug middleware for admin routes
router.use((req, res, next) => {
    console.log(`[Admin Router] ${req.method} ${req.path}`, {
        originalUrl: req.originalUrl,
        baseUrl: req.baseUrl,
        url: req.url
    })
    next()
})

// Test route to verify router is accessible
router.get('/test', (req, res) => {
    res.json({
        message: 'Admin router is working',
        method: req.method,
        path: req.path,
        routes: ['POST /login', 'POST /track-visit', 'POST /track-project-view', 'POST /logout', 'GET /analytics']
    })
})

// Public admin routes
router.post('/login', (req, res, next) => {
    console.log('[Login Route] POST /login hit')
    login(req, res, next)
})

// Public tracking routes (no auth needed — called from portfolio frontend)
router.post('/track-visit', trackPageVisit)
router.post('/track-project-view', trackProjectView)

// Protected admin routes
router.post('/logout', isLoggedIn, logout)
router.get('/analytics', isLoggedIn, getAnalytics)

module.exports = router
