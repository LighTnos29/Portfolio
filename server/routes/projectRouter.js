const express = require('express')
const router = express.Router()
const { createProject, githubFetch, githubPrivateRepoFetch, createProjectFromRepo } = require('../controllers/projectController')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.post('/create', isLoggedIn, createProject)
router.get('/private', isLoggedIn, githubPrivateRepoFetch)
router.post('/create-from-repo', isLoggedIn, createProjectFromRepo)

module.exports = router
