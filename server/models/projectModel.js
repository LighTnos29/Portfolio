const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true,
        trim: true
    },
    domain: { 
        type: String, 
        required: true,
        trim: true
    },
    description: { 
        type: String,
        trim: true
    },
    techStack: { 
        type: [String],
        default: []
    },
    liveDemoUrl: { 
        type: String,
        trim: true
    },
    githubUrl: { 
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
