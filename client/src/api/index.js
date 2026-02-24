// Use environment variable for production, fallback to /api for development (Vite proxy)
// Note: In production, VITE_API_BASE_URL should be the full backend URL WITHOUT /api suffix
// Example: https://portfolio-qpkw.onrender.com (not https://portfolio-qpkw.onrender.com/api)
const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

// Warn if API_BASE is not set in production
if (import.meta.env.PROD && API_BASE === '/api') {
    console.error('⚠️ VITE_API_BASE_URL is not set! Requests will fail. Set it in Vercel environment variables.')
}

// Backend base URL for serving static files (images)
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

// Helper for making API calls
async function request(endpoint, options = {}) {
    // Ensure endpoint starts with / and API_BASE doesn't end with /
    const cleanBase = API_BASE.endsWith('/') ? API_BASE.slice(0, -1) : API_BASE
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const url = `${cleanBase}${cleanEndpoint}`

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
            error: text.substring(0, 200) // First 200 chars of response
        }
    }

    if (!response.ok) {
        // Special handling for 405 errors (common when API_BASE is wrong)
        if (response.status === 405) {
            const errorMsg = API_BASE === '/api' && import.meta.env.PROD
                ? 'Method not allowed. VITE_API_BASE_URL is not set in Vercel. Please configure it in Vercel environment variables.'
                : `Method not allowed (405). Check if the API URL is correct. Current API_BASE: ${API_BASE}`
            throw {
                status: response.status,
                message: errorMsg,
                ...data
            }
        }
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
