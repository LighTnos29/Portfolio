const Visit = require('../models/visitModel');
const { hashIP } = require('../controllers/analyticsController');

const trackVisit = async (req, res, next) => {
    try {
        const skipPaths = ['/admin', '/api', '/favicon.ico', '/robots.txt'];
        const shouldSkip = skipPaths.some(path => req.path.startsWith(path)) || 
                          req.path.includes('.') || 
                          req.method !== 'GET';

        if (!shouldSkip) {
            const clientIP = req.ip || req.connection.remoteAddress || '127.0.0.1';
            const ipHash = hashIP(clientIP);
            const userAgent = req.get('User-Agent') || 'Unknown';
            
            Visit.create({
                page: req.path,
                ipHash: ipHash,
                userAgent: userAgent
            }).catch(error => {
                console.error('Error tracking visit:', error.message);
            });
        }
    } catch (error) {
        console.error('Error in trackVisit middleware:', error.message);
    }
    
    next();
};

module.exports = trackVisit;
