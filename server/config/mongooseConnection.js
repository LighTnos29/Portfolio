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

const options = {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 8000,
    socketTimeoutMS: 20000,
    maxPoolSize: 10,
    retryWrites: true
}

const isProd = process.env.NODE_ENV === 'production'

mongoose.connect(connectionString, options)
    .then(() => {
        if (!isProd) console.log('✅ MongoDB connected:', mongoose.connection.db?.databaseName || DB_NAME)
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err.code || err.name)
    })

mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB error:', err.code || err.name)
})

if (!isProd) {
    mongoose.connection.on('disconnected', () => console.warn('⚠️ MongoDB disconnected'))
    mongoose.connection.on('reconnected', () => console.log('✅ MongoDB reconnected'))
}

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    process.exit(0)
})

module.exports = mongoose
