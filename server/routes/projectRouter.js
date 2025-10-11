const express = require('express')
const router = express.Router()
const { createProject, githubFetch, githubPrivateRepoFetch } = require('../controllers/projectController')

router.post('/create', createProject)
router.get('/fetch', githubFetch)
router.get('/private', githubPrivateRepoFetch)

module.exports = router