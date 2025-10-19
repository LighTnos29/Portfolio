const express = require('express')
const { login } = require('../controllers/authController')
const { getAnalytics, trackProjectView } = require('../controllers/analyticsController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()

router.post('/login', login)
router.get('/analytics', isLoggedIn, getAnalytics)
router.post('/track-project-view', trackProjectView)

module.exports = router
