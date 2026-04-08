const Visit = require('../models/visitModel');
const ProjectView = require('../models/projectViewModel');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Helper function to hash IP for privacy
const hashIP = (ip) => {
    const salt = process.env.IP_HASH_SALT || process.env.JWT_SECRET || 'portfolio-salt';
    return crypto.createHash('sha256').update(ip + salt).digest('hex').slice(0, 16);
};

// Get comprehensive analytics data (admin only)
module.exports.getAnalytics = async (req, res) => {
    try {
        // Check MongoDB connection
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                success: false,
                message: "Database connection not available. Please try again.",
                error: "MongoDB is not connected"
            })
        }

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Get total visits
        const totalVisits = await Visit.countDocuments();
        
        // Get visits today
        const visitsToday = await Visit.countDocuments({
            timestamp: { $gte: today }
        });

        // Get visits this week
        const visitsThisWeek = await Visit.countDocuments({
            timestamp: { $gte: weekAgo }
        });

        // Get visits this month
        const visitsThisMonth = await Visit.countDocuments({
            timestamp: { $gte: monthAgo }
        });

        // Get top pages
        const topPages = await Visit.aggregate([
            {
                $group: {
                    _id: '$page',
                    visits: { $sum: 1 }
                }
            },
            { $sort: { visits: -1 } },
            { $limit: 10 }
        ]);

        // Get popular projects
        const popularProjects = await ProjectView.aggregate([
            {
                $group: {
                    _id: '$projectId',
                    projectTitle: { $first: '$projectTitle' },
                    views: { $sum: 1 }
                }
            },
            { $sort: { views: -1 } },
            { $limit: 10 }
        ]);

        // Get daily visits for the last 30 days
        const dailyVisits = await Visit.aggregate([
            {
                $match: {
                    timestamp: { $gte: monthAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$timestamp' },
                        month: { $month: '$timestamp' },
                        day: { $dayOfMonth: '$timestamp' }
                    },
                    visits: { $sum: 1 }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
        ]);

        // Get recent activity (last 20 visits)
        const recentActivity = await Visit.find()
            .select('page timestamp')
            .sort({ timestamp: -1 })
            .limit(20);

        // Get unique visitors (approximate based on IP hash)
        const uniqueVisitorsToday = await Visit.distinct('ipHash', {
            timestamp: { $gte: today }
        });

        const uniqueVisitorsThisWeek = await Visit.distinct('ipHash', {
            timestamp: { $gte: weekAgo }
        });

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalVisits,
                    visitsToday,
                    visitsThisWeek,
                    visitsThisMonth,
                    uniqueVisitorsToday: uniqueVisitorsToday.length,
                    uniqueVisitorsThisWeek: uniqueVisitorsThisWeek.length
                },
                topPages: topPages.map(page => ({
                    page: page._id,
                    visits: page.visits
                })),
                popularProjects: popularProjects.map(project => ({
                    id: project._id,
                    title: project.projectTitle,
                    views: project.views
                })),
                dailyVisits: dailyVisits.map(day => ({
                    date: `${day._id.year}-${day._id.month.toString().padStart(2, '0')}-${day._id.day.toString().padStart(2, '0')}`,
                    visits: day.visits
                })),
                recentActivity: recentActivity.map(visit => ({
                    page: visit.page,
                    timestamp: visit.timestamp
                }))
            }
        });

    } catch (error) {
        if (process.env.NODE_ENV !== 'production') console.error('Error fetching analytics:', error.message);

        if (error.name === 'MongoServerError' || error.name === 'MongooseError' || error.name === 'MongoNetworkError') {
            return res.status(503).json({
                success: false,
                message: "Database connection error. Please try again."
            })
        }

        res.status(500).json({
            success: false,
            message: "Error fetching analytics data"
        });
    }
};

// Track page visit (public — called from portfolio frontend)
module.exports.trackPageVisit = async (req, res) => {
    try {
        const { page } = req.body;

        const safePage = typeof page === 'string'
            ? page.slice(0, 200).replace(/[<>]/g, '')
            : '/';

        const clientIP = req.ip || req.connection?.remoteAddress || '127.0.0.1';
        const ipHash = hashIP(clientIP);
        const userAgent = (req.get('User-Agent') || 'Unknown').slice(0, 300);

        await Visit.create({
            page: safePage,
            ipHash,
            userAgent
        });

        res.status(200).json({
            success: true,
            message: "Visit tracked"
        });
    } catch (error) {
        console.error('Error tracking visit:', error);
        res.status(500).json({
            success: false,
            message: "Error tracking visit"
        });
    }
};

// Track project view (public)
module.exports.trackProjectView = async (req, res) => {
    try {
        const { projectId, projectTitle } = req.body;

        if (!projectId || typeof projectId !== 'string' || projectId.length > 100) {
            return res.status(400).json({ success: false, message: 'Invalid project ID' });
        }

        const safeTitle = typeof projectTitle === 'string'
            ? projectTitle.slice(0, 200).replace(/[<>]/g, '')
            : '';

        const clientIP = req.ip || req.connection?.remoteAddress || '127.0.0.1';
        const ipHash = hashIP(clientIP);

        await ProjectView.create({
            projectId,
            projectTitle: safeTitle,
            ipHash
        });

        res.status(200).json({
            success: true,
            message: "Project view tracked"
        });

    } catch (error) {
        console.error('Error tracking project view:', error);
        res.status(500).json({
            success: false,
            message: "Error tracking project view"
        });
    }
};

module.exports.hashIP = hashIP;
