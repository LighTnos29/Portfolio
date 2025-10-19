const Visit = require('../models/visitModel');
const { hashIP } = require('../controllers/analyticsController');

const trackVisit = async (req, res, next) => {
    try {
        // Skip tracking for admin routes, API calls, and static files
        const skipPaths = ['/admin', '/api', '/favicon.ico', '/robots.txt'];
        const shouldSkip = skipPaths.some(path => req.path.startsWith(path)) || 
                          req.path.includes('.') || // Skip file requests
                          req.method !== 'GET'; // Only track GET requests

        if (!shouldSkip) {
            // Get client IP and hash it for privacy
            const clientIP = req.ip || req.connection.remoteAddress || '127.0.0.1';
            const ipHash = hashIP(clientIP);
            
            // Get user agent
            const userAgent = req.get('User-Agent') || 'Unknown';
            
            // Track the visit asynchronously (don't wait for it to complete)
            Visit.create({
                page: req.path,
                ipHash: ipHash,
                userAgent: userAgent
            }).catch(error => {
                // Log error but don't break the request
                console.error('Error tracking visit:', error.message);
            });
        }
    } catch (error) {
        // Log error but don't break the request
        console.error('Error in trackVisit middleware:', error.message);
    }
    
    // Always continue to next middleware
    next();
};

module.exports = trackVisit;
