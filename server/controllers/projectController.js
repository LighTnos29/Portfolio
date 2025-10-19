const projectModel = require('../models/projectModel')
const axios = require('axios')
const { GoogleGenerativeAI } = require('@google/generative-ai')

module.exports.createProject = async (req, res) => {
    try {
        let { title, domain, description, techStack, liveDemoUrl, githubUrl } = req.body
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
            liveDemoUrl
        })
        res.status(200).json({
            success: true,
            message: "Project created successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failure",
        })
    }
}

module.exports.githubPrivateRepoFetch = async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            }
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ message: "Error fetching repositories", error: error.message });
    }
}

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

        const languagesResponse = await axios.get(`https://api.github.com/repos/${owner}/${repoName}/languages`, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
            }
        });

        const languages = Object.keys(languagesResponse.data);

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

        let projectData;
        try {
            projectData = JSON.parse(aiResponse);
        } catch (parseError) {
            console.error('Error parsing AI response:', parseError);
            console.error('AI Response:', aiResponse);

            projectData = {
                title: repoData.name || 'Unknown Project',
                domain: languages.length > 0 ? 'Software Development' : 'General',
                description: repoData.description || 'A project developed using various technologies.',
                techStack: languages.length > 0 ? languages : ['Unknown']
            };
        }

        const project = await projectModel.create({
            title: projectData.title,
            domain: projectData.domain,
            description: projectData.description,
            techStack: projectData.techStack,
            githubUrl: repoData.html_url,
            liveDemoUrl: repoData.homepage || ''
        });

        res.status(200).json({
            success: true,
            message: "Project created successfully from repository",
            project: project
        });

    } catch (error) {
        console.error('Error creating project from repo:', error);
        res.status(500).json({
            success: false,
            message: "Error creating project from repository",
            error: error.message
        });
    }
}
