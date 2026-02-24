const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME || 'portfolio'

// Build connection string - simple approach
let connectionString

if (MONGODB_URI) {
    const uri = MONGODB_URI.trim()

    // Check if database name exists (after last / and before ?)
    const beforeQuery = uri.split('?')[0]
    const lastSlash = beforeQuery.lastIndexOf('/')
    const afterSlash = beforeQuery.substring(lastSlash + 1)

    // If there's text after last / that's not empty and doesn't contain @, it's a database name
    const hasDbName = afterSlash && afterSlash.length > 0 && !afterSlash.includes('@')

    if (hasDbName) {
        connectionString = uri
    } else {
        // Add database name before query string
        if (uri.includes('?')) {
            connectionString = uri.replace('?', `/${DB_NAME}?`)
        } else {
            connectionString = `${uri}/${DB_NAME}`
        }
    }
} else {
    connectionString = `mongodb://localhost:27017/${DB_NAME}`
}

console.log('Connecting to MongoDB...')
const safeUri = connectionString.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
console.log("Connection string:", safeUri)

// Disable buffering
mongoose.set('bufferCommands', false)

// Connection options
const options = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000
}

// Connect
mongoose.connect(connectionString, options)
    .then(() => {
        console.log("✅ Connected to MongoDB")
        console.log("Database:", mongoose.connection.db?.databaseName || DB_NAME)
    })
    .catch((err) => {
        console.error("❌ MongoDB connection failed")
        console.error("Error:", err.message)
        console.error("Code:", err.code || err.name)
        console.error("URI format:", safeUri)
        console.error("\nCheck:")
        console.error("1. MONGODB_URI is set in Render environment variables")
        console.error("2. MongoDB Atlas Network Access allows 0.0.0.0/0")
        console.error("3. Username and password are correct")
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