const express = require('express')
const { login } = require('../controllers/authController')
const { getAnalytics, trackProjectView } = require('../controllers/analyticsController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const trackVisit = require('../middlewares/trackVisit')
const router = express.Router()

// Public admin routes (no tracking)
router.post('/login', login)

// Protected admin routes (with visit tracking)
router.get('/analytics', isLoggedIn, trackVisit, getAnalytics)
router.post('/track-project-view', isLoggedIn, trackProjectView)

module.exports = router
