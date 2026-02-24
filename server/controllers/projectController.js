const projectModel = require('../models/projectModel')
const mongoose = require('mongoose')
const axios = require('axios')
const { GoogleGenerativeAI } = require('@google/generative-ai')
const path = require('path')

// Get all projects (public)
module.exports.getAllProjects = async (req, res) => {
    try {
        // Check if MongoDB is connected
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                message: "Database connection not available",
                error: "MongoDB is not connected"
            });
        }
        const projects = await projectModel.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            projects
        })
    } catch (error) {
        console.error('Error fetching projects:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({
            success: false,
            message: "Error fetching projects",
            error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message
        })
    }
}

// Get single project (public)
module.exports.getProject = async (req, res) => {
    try {
        const project = await projectModel.findById(req.params.id)
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }
        res.status(200).json({
            success: true,
            project
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching project",
            error: error.message
        })
    }
}

// Create project (admin only)
module.exports.createProject = async (req, res) => {
    try {
        let { title, domain, description, techStack, liveDemoUrl, githubUrl, imageUrl } = req.body
        if (!title || !domain) {
            return res.status(400).json({
                success: false,
                message: "Title and domain are required."
            })
        }
        const project = await projectModel.create({
            title,
            domain,
            description,
            techStack,
            githubUrl,
            liveDemoUrl,
            imageUrl
        })
        res.status(200).json({
            success: true,
            message: "Project created successfully",
            project
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failure",
        })
    }
}

// Update project (admin only)
module.exports.updateProject = async (req, res) => {
    try {
        const { title, domain, description, techStack, liveDemoUrl, githubUrl, imageUrl } = req.body
        const project = await projectModel.findByIdAndUpdate(
            req.params.id,
            { title, domain, description, techStack, liveDemoUrl, githubUrl, imageUrl },
            { new: true, runValidators: true }
        )
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            project
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Error updating project",
            error: error.message
        })
    }
}

// Delete project (admin only)
module.exports.deleteProject = async (req, res) => {
    try {
        const project = await projectModel.findByIdAndDelete(req.params.id)
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting project",
            error: error.message
        })
    }
}

// Fetch GitHub private repos (admin only)
module.exports.githubPrivateRepoFetch = async (req, res) => {
    try {
        // Check if token exists
        if (!process.env.GITHUB_ACCESS_TOKEN) {
            return res.status(500).json({
                success: false,
                message: "GitHub access token is not configured. Please set GITHUB_ACCESS_TOKEN in your environment variables."
            });
        }

        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        res.status(200).json({
            success: true,
            repos: response.data
        });
    } catch (error) {
        console.error('GitHub API Error:', error.response?.data || error.message);

        // Handle specific GitHub API errors
        if (error.response) {
            const status = error.response.status;
            const githubError = error.response.data;

            if (status === 401) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid GitHub access token. Please check your GITHUB_ACCESS_TOKEN in environment variables.",
                    error: githubError.message || "Unauthorized"
                });
            }

            if (status === 403) {
                return res.status(403).json({
                    success: false,
                    message: "GitHub API rate limit exceeded or token lacks required permissions.",
                    error: githubError.message || "Forbidden"
                });
            }

            return res.status(status).json({
                success: false,
                message: "Error fetching repositories from GitHub",
                error: githubError.message || error.message
            });
        }

        // Network or other errors
        res.status(500).json({
            success: false,
            message: "Error connecting to GitHub API",
            error: error.message
        });
    }
}

// Create project from GitHub repo using AI (admin only)
module.exports.createProjectFromRepo = async (req, res) => {
    try {
        const { repoName } = req.body;
        const owner = "LighTnos29";

        if (!repoName) {
            return res.status(400).json({
                success: false,
                message: "Repository name is required"
            });
        }

        // Check if GitHub token exists
        if (!process.env.GITHUB_ACCESS_TOKEN) {
            return res.status(500).json({
                success: false,
                message: "GitHub access token is not configured. Please set GITHUB_ACCESS_TOKEN in your environment variables."
            });
        }

        const repoResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}`, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            }
        });

        const repoData = repoResponse.data;

        let readmeContent = '';
        try {
            const readmeResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/readme`, {
                headers: {
                    'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
            readmeContent = readmeResponse.data;

        } catch (readmeError) {
            console.log('No README found or error fetching README');
            readmeContent = 'No README available';
        }

        let languages = [];
        try {
            const languagesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
                headers: {
                    'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                }
            });
            languages = Object.keys(languagesResponse.data || {});
        } catch (languagesError) {
            console.log('Error fetching languages, continuing without them:', languagesError.message);
            languages = [];
        }

        // Try AI-powered description, fall back to raw GitHub data
        let projectData;
        try {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
            Analyze this GitHub repository and create a structured project description:

            Repository Name: ${repoData.name}
            Description: ${repoData.description || 'No description provided'}
            README Content: ${readmeContent}
            Languages Used: ${languages.join(', ')}
            Stars: ${repoData.stargazers_count}
            Homepage: ${repoData.homepage || 'N/A'}

            Based on this information, please provide a JSON response with the following structure:
            {
                "title": "Project title (concise and descriptive)",
                "domain": "Project domain/category (e.g., Web Development, Mobile App, AI/ML, etc.)",
                "description": "Detailed project description (2-3 sentences)",
                "techStack": ["array", "of", "technologies", "used"]
            }

            Focus on:
            1. Creating a clear, professional title
            2. Categorizing the project domain appropriately
            3. Writing a compelling description that highlights key features
            4. Listing the main technologies/frameworks used

            Return only valid JSON without any additional text or formatting.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            let aiResponse = response.text();

            aiResponse = aiResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '');

            const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                aiResponse = jsonMatch[0];
            }

            projectData = JSON.parse(aiResponse);
        } catch (aiError) {
            console.log('AI generation failed, using GitHub data as fallback:', aiError.message);

            // Fallback: use raw GitHub repo data
            const name = repoData.name || 'Unknown Project';
            const title = name
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase());

            projectData = {
                title,
                domain: languages.length > 0 ? 'Software Development' : 'General',
                description: repoData.description || `A project built with ${languages.join(', ') || 'various technologies'}.`,
                techStack: languages.length > 0 ? languages : ['Unknown']
            };
        }

        // Validate required fields before creating project
        if (!projectData.title || !projectData.domain) {
            console.error('Missing required fields:', { title: projectData.title, domain: projectData.domain });
            return res.status(400).json({
                success: false,
                message: "Failed to generate project data. Missing required fields.",
                error: "Title or domain is missing"
            });
        }

        // Ensure techStack is an array
        if (!Array.isArray(projectData.techStack)) {
            projectData.techStack = projectData.techStack ? [projectData.techStack] : ['Unknown'];
        }

        const project = await projectModel.create({
            title: projectData.title.trim(),
            domain: projectData.domain.trim(),
            description: (projectData.description || '').trim(),
            techStack: projectData.techStack,
            githubUrl: repoData.html_url || '',
            liveDemoUrl: repoData.homepage || ''
        });

        res.status(200).json({
            success: true,
            message: "Project created successfully from repository",
            project: project
        });

    } catch (error) {
        console.error('Error creating project from repo:', error);
        console.error('Error stack:', error.stack);

        // Handle specific error types
        if (error.response) {
            // GitHub API error
            const status = error.response.status;
            const githubError = error.response.data;

            if (status === 401) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid GitHub access token. Please check your GITHUB_ACCESS_TOKEN in environment variables.",
                    error: githubError.message || "Unauthorized"
                });
            }

            if (status === 404) {
                return res.status(404).json({
                    success: false,
                    message: `Repository "${repoName}" not found. Please check the repository name.`,
                    error: githubError.message || "Repository not found"
                });
            }

            if (status === 403) {
                return res.status(403).json({
                    success: false,
                    message: "GitHub API rate limit exceeded or token lacks required permissions.",
                    error: githubError.message || "Forbidden"
                });
            }

            return res.status(status).json({
                success: false,
                message: "Error fetching repository data from GitHub",
                error: githubError.message || error.message
            });
        }

        // Database or validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: "Invalid project data",
                error: error.message
            });
        }

        // Generic error
        res.status(500).json({
            success: false,
            message: "Error creating project from repository",
            error: error.message || "Unknown error occurred"
        });
    }
}

// Upload project image (admin only)
module.exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file provided"
            })
        }

        // Return the URL path (relative to /uploads)
        const imageUrl = `/uploads/projects/${req.file.filename}`

        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            imageUrl
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error uploading image",
            error: error.message
        })
    }
}
