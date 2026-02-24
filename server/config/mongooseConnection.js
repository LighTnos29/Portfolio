const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME || 'portfolio'

let connectionString

if (MONGODB_URI) {
    const uri = MONGODB_URI.trim()
    const [baseUri, query] = uri.split('?')
    const parts = baseUri.split('/')
    const lastPart = parts[parts.length - 1]
    const hasDbName = lastPart && lastPart.length > 0 && !lastPart.includes('@') && !lastPart.includes('.mongodb.net')

    if (hasDbName) {
        connectionString = uri
    } else {
        connectionString = query ? `${baseUri}/${DB_NAME}?${query}` : `${baseUri}/${DB_NAME}`
    }
} else {
    connectionString = `mongodb://localhost:27017/${DB_NAME}`
}

const safeUri = connectionString.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')
console.log('🔌 Connecting to MongoDB...')
console.log('📍 Connection string format:', safeUri)

const options = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
    retryWrites: true
}

mongoose.connect(connectionString, options)
    .then(() => {
        console.log('✅ MongoDB connected successfully')
        console.log('📊 Database:', mongoose.connection.db?.databaseName || DB_NAME)
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed')
        console.error('📝 Error:', err.message)
        console.error('🔖 Code:', err.code || err.name)
    })

mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connection established')
})

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.message)
})

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected')
})

mongoose.connection.on('reconnected', () => {
    console.log('✅ MongoDB reconnected')
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

module.exports = mongoose
