const mongoose = require('mongoose');

const projectViewSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    projectTitle: {
        type: String,
        required: true,
        trim: true
    },
    ipHash: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
projectViewSchema.index({ timestamp: -1 });
projectViewSchema.index({ projectId: 1, timestamp: -1 });

module.exports = mongoose.model('ProjectView', projectViewSchema);
