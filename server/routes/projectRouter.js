const express = require('express')
const router = express.Router()
const { getAllProjects, getProject, createProject, updateProject, deleteProject, githubPrivateRepoFetch, createProjectFromRepo, uploadImage } = require('../controllers/projectController')
const isLoggedIn = require('../middlewares/isLoggedIn')
const upload = require('../utils/upload')

// Protected routes (must be BEFORE /:id to avoid route conflicts)
router.get('/github/repos', isLoggedIn, githubPrivateRepoFetch)
router.post('/upload-image', isLoggedIn, upload.single('image'), uploadImage)
router.post('/create', isLoggedIn, createProject)
router.post('/create-from-repo', isLoggedIn, createProjectFromRepo)

// Public routes
router.get('/', getAllProjects)
router.get('/:id', getProject)

// Protected routes
router.put('/:id', isLoggedIn, updateProject)
router.delete('/:id', isLoggedIn, deleteProject)

module.exports = router
