const projectModel = require('../models/projectModel')
const axios = require('axios')

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

module.exports.githubFetch = async (req, res) => {
    try {
        const response = await axios.get('https://api.github.com/users/LighTnos29/repos')
        return res.send(response.data)
    } catch (error) {
        res.send("there is an error")
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
    }}
