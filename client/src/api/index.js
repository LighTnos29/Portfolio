// Use environment variable for production, fallback to /api for development
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

// Backend base URL for serving static files (images)
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

// Helper for making API calls
async function request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        ...options,
    }

    let response
    try {
        response = await fetch(url, config)
    } catch (error) {
        // Network error (CORS, connection failed, etc.)
        throw { 
            status: 0, 
            message: 'Network error: Unable to connect to server. Please check your connection and API URL.',
            error: error.message 
        }
    }

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type')
    const hasJsonContent = contentType && contentType.includes('application/json')
    
    let data
    if (hasJsonContent) {
        try {
            const text = await response.text()
            data = text ? JSON.parse(text) : {}
        } catch (parseError) {
            throw {
                status: response.status,
                message: 'Invalid response from server',
                error: 'Failed to parse JSON response'
            }
        }
    } else {
        // Response is not JSON (might be HTML error page)
        const text = await response.text()
        throw {
            status: response.status,
            message: `Server returned ${response.status} ${response.statusText}`,
            error: text.substring(0, 100) // First 100 chars of response
        }
    }

    if (!response.ok) {
        throw { status: response.status, ...data }
    }

    return data
}

// ── Public API ──────────────────────────────────────────────────────────────

export const getProjects = () => request('/project')

export const getProject = (id) => request(`/project/${id}`)

export const trackVisit = (page) =>
    request('/admin/track-visit', {
        method: 'POST',
        body: JSON.stringify({ page }),
    })

export const trackProjectView = (projectId, projectTitle) =>
    request('/admin/track-project-view', {
        method: 'POST',
        body: JSON.stringify({ projectId, projectTitle }),
    })

// ── Admin API ───────────────────────────────────────────────────────────────

export const adminLogin = (code) =>
    request('/admin/login', {
        method: 'POST',
        body: JSON.stringify({ code }),
    })

export const adminLogout = () =>
    request('/admin/logout', {
        method: 'POST',
    })

export const getAnalytics = () => request('/admin/analytics')

export const createProject = (projectData) =>
    request('/project/create', {
        method: 'POST',
        body: JSON.stringify(projectData),
    })

export const updateProject = (id, projectData) =>
    request(`/project/${id}`, {
        method: 'PUT',
        body: JSON.stringify(projectData),
    })

export const deleteProject = (id) =>
    request(`/project/${id}`, {
        method: 'DELETE',
    })

export const fetchGithubRepos = () => request('/project/github/repos')

export const createProjectFromRepo = (repoName) =>
    request('/project/create-from-repo', {
        method: 'POST',
        body: JSON.stringify({ repoName }),
    })

export const uploadImage = async (file) => {
    const formData = new FormData()
    formData.append('image', file)

    const url = `${API_BASE}/project/upload-image`
    let response
    try {
        response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
    } catch (error) {
        throw { 
            status: 0, 
            message: 'Network error: Unable to upload image',
            error: error.message 
        }
    }

    const contentType = response.headers.get('content-type')
    const hasJsonContent = contentType && contentType.includes('application/json')
    
    let data
    if (hasJsonContent) {
        try {
            const text = await response.text()
            data = text ? JSON.parse(text) : {}
        } catch (parseError) {
            throw {
                status: response.status,
                message: 'Invalid response from server',
                error: 'Failed to parse JSON response'
            }
        }
    } else {
        const text = await response.text()
        throw {
            status: response.status,
            message: `Server returned ${response.status} ${response.statusText}`,
            error: text.substring(0, 100)
        }
    }

    if (!response.ok) {
        throw { status: response.status, ...data }
    }

    return data
}
