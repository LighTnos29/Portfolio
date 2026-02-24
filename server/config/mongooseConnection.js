const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME || 'portfolio'

// Build connection string properly
function buildConnectionString() {
    if (!MONGODB_URI) {
        return `mongodb://localhost:27017/${DB_NAME}`
    }

    const uri = MONGODB_URI.trim()

    // Check if database name already exists in URI
    // Format examples:
    // mongodb+srv://user:pass@host/dbname?options
    // mongodb+srv://user:pass@host/?options (no db name)
    // mongodb+srv://user:pass@host (no db name, no options)

    // Split by '?' to separate query params
    const [baseUri, queryString] = uri.split('?')

    // Check if there's a database name after the last '/'
    // After splitting by '/', the last part should be the database name if it exists
    const parts = baseUri.split('/')
    const lastPart = parts[parts.length - 1]

    // Database name detection:
    // - Must exist and not be empty
    // - Must not contain '@' (which would be part of user:pass@host)
    // - Must not contain '.' (which would be part of hostname like cluster0.1axkehq.mongodb.net)
    // - Must not be just the protocol part (mongodb+srv: or mongodb:)
    const hasDbName = lastPart &&
        lastPart.length > 0 &&
        !lastPart.includes('@') &&
        !lastPart.includes('.') &&
        !lastPart.includes(':')

    if (hasDbName) {
        // Database name already exists, use as-is
        return uri
    }

    // No database name, add it
    if (queryString) {
        // Has query params, insert database name before '?'
        return `${baseUri}/${DB_NAME}?${queryString}`
    } else {
        // No query params, append database name
        return `${baseUri}/${DB_NAME}`
    }
}

const connectionString = buildConnectionString()

// Log connection info (without credentials)
const safeUri = connectionString.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
console.log('🔌 Connecting to MongoDB...')
console.log('📍 Connection string:', safeUri)
console.log('📦 Database name:', DB_NAME)

// Disable buffering - fail fast if not connected
mongoose.set('bufferCommands', false)
mongoose.set('bufferMaxEntries', 0)

// Connection options for reliability
const connectionOptions = {
    serverSelectionTimeoutMS: 10000, // 10 seconds to select server
    socketTimeoutMS: 45000, // 45 seconds socket timeout
    connectTimeoutMS: 10000, // 10 seconds to connect
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 2, // Maintain at least 2 socket connections
    retryWrites: true,
    w: 'majority'
}

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await mongoose.connect(connectionString, connectionOptions)

        console.log('✅ MongoDB connected successfully')
        console.log('📊 Database:', mongoose.connection.db?.databaseName || DB_NAME)
        console.log('🔗 Connection state:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected')

        return true
    } catch (error) {
        console.error('❌ MongoDB connection failed')
        console.error('📝 Error:', error.message)
        console.error('🔖 Error code:', error.code || error.name)
        console.error('🔗 URI format:', safeUri)
        console.error('\n🔍 Troubleshooting:')
        console.error('1. Check MONGODB_URI in Render environment variables')
        console.error('2. Verify MongoDB Atlas Network Access (allow 0.0.0.0/0)')
        console.error('3. Confirm username and password are correct')
        console.error('4. Check if MongoDB Atlas cluster is running')

        // Don't throw - let server start and handle errors gracefully
        return false
    }
}

// Initialize connection
connectToMongoDB()

// Connection event handlers
mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connection established')
})

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message)
})

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected')
    console.log('🔄 Attempting to reconnect...')
})

mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected successfully')
})

// Handle process termination
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('MongoDB connection closed through app termination')
    process.exit(0)
})

module.exports = mongoose