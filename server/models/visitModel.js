const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        trim: true
    },
    ipHash: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
visitSchema.index({ timestamp: -1 });
visitSchema.index({ page: 1, timestamp: -1 });

module.exports = mongoose.model('Visit', visitSchema);
