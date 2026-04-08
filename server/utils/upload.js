const multer = require('multer')
const cloudinary = require('cloudinary').v2
const path = require('path')

// Configure Cloudinary from env vars
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Use memory storage — no disk writes, stream straight to Cloudinary
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = allowedTypes.test(file.mimetype)
    if (extname && mimetype) {
        cb(null, true)
    } else {
        cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'), false)
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter,
})

// Upload buffer to Cloudinary and return the secure URL
const uploadToCloudinary = (buffer, originalName) => {
    return new Promise((resolve, reject) => {
        const name = path.basename(originalName, path.extname(originalName)).replace(/[^a-zA-Z0-9]/g, '-')
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'portfolio/projects',
                public_id: `${Date.now()}-${name}`,
                transformation: [
                    { quality: 'auto', fetch_format: 'auto' }, // auto WebP/AVIF + compression
                    { width: 1200, crop: 'limit' },             // cap max width
                ],
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result.secure_url)
            }
        )
        stream.end(buffer)
    })
}

module.exports = { upload, uploadToCloudinary }
