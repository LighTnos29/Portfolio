const express = require('express')
const { login } = require('../controllers/authController')
const { getAnalytics, trackProjectView, trackPageVisit } = require('../controllers/analyticsController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

// Public admin routes
router.post('/login', login)

// Public tracking routes (no auth needed — called from portfolio frontend)
router.post('/track-visit', trackPageVisit)
router.post('/track-project-view', trackProjectView)

// Protected admin routes
router.get('/analytics', isLoggedIn, getAnalytics)

module.exports = router
