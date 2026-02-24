const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME || 'portfolio'

// Build connection string
let connectionString

if (MONGODB_URI) {
    // Check if URI already includes a database name
    // Format: mongodb+srv://user:pass@host/dbname?options
    // or: mongodb+srv://user:pass@host/?options (no db name)

    // Remove trailing slash and check for database name
    let cleanUri = MONGODB_URI.trim().replace(/\/$/, '')

    // Check if there's a database name before the query string
    const uriWithoutQuery = cleanUri.split('?')[0]
    const pathParts = uriWithoutQuery.split('/')

    // Check if last part is a database name (not empty, not just the host)
    // pathParts format: ['mongodb+srv:', '', 'user:pass@host', 'dbname'] or ['mongodb+srv:', '', 'user:pass@host', '']
    const lastPart = pathParts[pathParts.length - 1]
    const hasDatabase = lastPart && lastPart !== '' && !lastPart.includes('@') && !lastPart.includes('.')

    if (hasDatabase) {
        // URI already has database name, use as-is
        connectionString = cleanUri
        console.log('Using provided database name from URI')
    } else {
        // Append database name before query string
        if (cleanUri.includes('?')) {
            // Has query parameters, insert database name before '?'
            connectionString = cleanUri.replace(/\?/, `/${DB_NAME}?`)
        } else {
            // No query parameters, append database name
            connectionString = `${cleanUri}/${DB_NAME}`
        }
        console.log(`Appending database name: ${DB_NAME}`)
    }
} else {
    // Default to localhost
    connectionString = `mongodb://localhost:27017/${DB_NAME}`
    console.log('Using default localhost connection')
}

console.log('Connecting to MongoDB...')
// Log connection string format (without credentials) for debugging
const safeUri = connectionString.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
console.log("Connection string format:", safeUri)

// MongoDB connection options for better reliability
const mongooseOptions = {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    retryWrites: true,
    w: 'majority'
}

mongoose
    .connect(connectionString, mongooseOptions)
    .then(function () {
        console.log("✅ Connected to MongoDB")
        const dbName = mongoose.connection.db?.databaseName || DB_NAME
        console.log("Database:", dbName)
        console.log("Connection state:", mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected')
    })
    .catch(function (err) {
        console.error("❌ MongoDB connection error:", err.message)
        console.error("Error details:", err.name, err.code)
        // Log connection string without credentials for debugging
        console.error("Connection string format:", safeUri)
        console.error("Make sure MONGODB_URI is set correctly in Render environment variables")
        // Don't exit - let the server start and handle errors gracefully
        // Routes will handle database errors individually
    })

// Handle connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message)
})

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting to reconnect...')
})

mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected')
})