const API_BASE = '/api'

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

    const response = await fetch(url, config)
    const data = await response.json()

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
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
        throw { status: response.status, ...data }
    }

    return data
}
