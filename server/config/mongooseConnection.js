const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME || 'portfolio'

// Build connection string
let connectionString

if (MONGODB_URI) {
    // Check if URI already includes a database name
    // Format: mongodb+srv://user:pass@host/dbname?options
    // or: mongodb+srv://user:pass@host/?options (no db name)

    // Check if there's a database name before the query string
    const uriWithoutQuery = MONGODB_URI.split('?')[0]
    const pathParts = uriWithoutQuery.split('/')

    // If the last part after host is not empty and not just '/', it has a database name
    const hasDatabase = pathParts.length > 3 && pathParts[pathParts.length - 1] && pathParts[pathParts.length - 1] !== ''

    if (hasDatabase) {
        // URI already has database name, use as-is
        connectionString = MONGODB_URI
    } else {
        // Append database name before query string
        if (MONGODB_URI.includes('?')) {
            // Has query parameters, insert database name before '?'
            connectionString = MONGODB_URI.replace('?', `/${DB_NAME}?`)
        } else {
            // No query parameters, append database name
            connectionString = `${MONGODB_URI.replace(/\/$/, '')}/${DB_NAME}`
        }
    }
} else {
    // Default to localhost
    connectionString = `mongodb://localhost:27017/${DB_NAME}`
}

console.log('Connecting to MongoDB...')
mongoose
    .connect(connectionString)
    .then(function () {
        console.log("✅ Connected to MongoDB")
        const dbName = mongoose.connection.db?.databaseName || DB_NAME
        console.log("Database:", dbName)
    })
    .catch(function (err) {
        console.error("❌ MongoDB connection error:", err.message)
        // Log connection string without credentials for debugging
        const safeUri = connectionString.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
        console.error("Connection string format:", safeUri)
        // Don't exit - let the server start and handle errors gracefully
        // Routes will handle database errors individually
    })