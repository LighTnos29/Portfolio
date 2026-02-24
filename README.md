# Portfolio Full-Stack Application

A comprehensive full-stack portfolio application featuring a modern React frontend with stunning animations and a powerful Node.js backend with AI-powered project analysis using Google Gemini AI.

## 🚀 Features

### Frontend Features
- **Modern React Interface**: Built with React 19 and modern hooks
- **Responsive Design**: Tailwind CSS for mobile-first, responsive layouts
- **Smooth Animations**: Advanced animations using GSAP and Lenis Scroll
- **Interactive Portfolio**: Dynamic project showcase with pinned scroll animations
- **Admin Dashboard**: Secure admin interface for managing projects and analytics
- **Real-time Updates**: Live project management and GitHub integration
- **SEO Optimized**: Dynamic meta tags with react-helmet-async for better discoverability
- **Scroll to Top**: Floating button with smooth scroll animation
- **Resume Download**: One-click resume download from hero section
- **Contact Form**: EmailJS integration for contact form submissions
- **Analytics Dashboard**: Visual charts and statistics for visitor tracking

### Backend Features
- **Authentication System**: JWT-based admin authentication with secure cookie management
- **Project Management**: Full CRUD operations for portfolio projects
- **Image Upload**: Local file storage for project images using Multer
- **GitHub Integration**: Fetch public and private repositories
- **AI-Powered Analysis**: Automatically generate project descriptions using Google Gemini AI
- **Repository Processing**: Convert GitHub repositories into structured portfolio projects
- **Analytics Tracking**: Visitor and project view tracking with privacy-focused IP hashing
- **Secure Middleware**: Protected routes with authentication middleware
- **Session Management**: Automatic logout and session expiry handling

## 🛠️ Technologies Used

### Frontend Stack
- **Framework**: React 19 with modern hooks
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 for utility-first responsive design
- **Animations**: 
  - **GSAP**: Advanced timeline animations and scroll-triggered effects
  - **Lenis**: Smooth scroll implementation and scroll-based animations
- **Charts**: Recharts for analytics visualization
- **SEO**: react-helmet-async for dynamic meta tags
- **Email**: EmailJS for contact form submissions
- **HTTP Client**: Fetch API with centralized service layer
- **Build Tool**: Vite for fast development and optimized builds

### Backend Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) with httpOnly cookies
- **File Upload**: Multer for handling image uploads
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash)
- **GitHub API**: Repository data fetching and analysis
- **Security**: cookie-parser for session management, CORS for cross-origin requests

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB database
- GitHub Personal Access Token
- Google Gemini AI API Key
- EmailJS account (for contact form)

## ⚙️ Installation

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/LighTnos29/Portfolio.git
   cd Portfolio
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   ADMIN_ACCESS_CODE=your_admin_access_code
   
   # GitHub Integration
   GITHUB_ACCESS_TOKEN=your_github_personal_access_token
   
   # AI Integration
   GEMINI_API_KEY=your_google_gemini_api_key
   
   # Server
   PORT=3000
   
   # CORS (comma-separated list of allowed origins)
   # For production: ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
   # For development: Leave empty to use default localhost origins
   ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
   ```

4. **Create uploads directory**
   ```bash
   mkdir -p public/uploads/projects
   ```

5. **Start the backend server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd ../client
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional, for production)
   Create a `.env` file in the client directory:
   ```env
   # Backend API Base URL
   # For production: Use your Render backend URL
   # For development: Leave empty to use /api (Vite proxy)
   VITE_API_BASE_URL=https://portfolio-qpkw.onrender.com/api
   
   # Backend URL for serving static files (images)
   # For production: Use your Render backend URL
   # For development: Use http://localhost:3000
   VITE_BACKEND_URL=https://portfolio-qpkw.onrender.com
   ```
   **Note**: For local development, you can leave these empty - Vite proxy will handle it.

4. **Add resume file** (optional)
   Place your resume PDF in `client/public/resume.pdf` for download functionality

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Full-Stack Development

To run both frontend and backend simultaneously:

1. **Terminal 1 - Backend**
   ```bash
   cd server && npm start
   ```

2. **Terminal 2 - Frontend**
   ```bash
   cd client && npm run dev
   ```

The application will be available at:
- **Frontend**: `http://localhost:5173` (Vite dev server)
- **Backend API**: `http://localhost:3000`

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT token generation | ✅ |
| `ADMIN_ACCESS_CODE` | Admin access code for authentication | ✅ |
| `GITHUB_ACCESS_TOKEN` | GitHub Personal Access Token | ✅ |
| `GEMINI_API_KEY` | Google Gemini AI API Key | ✅ |
| `PORT` | Server port (default: 3000) | ❌ |
| `ALLOWED_ORIGINS` | Comma-separated list of allowed CORS origins (default: localhost) | ❌ |

## 📚 API Endpoints

### Authentication Routes (`/admin`)

#### Login
```http
POST /admin/login
Content-Type: application/json

{
  "code": "your_admin_access_code"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful."
}
```

#### Logout
```http
POST /admin/logout
Authorization: Cookie (Token required)
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful."
}
```

#### Get Analytics
```http
GET /admin/analytics
Authorization: Cookie (Token required)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalVisits": 150,
      "visitsToday": 10,
      "visitsThisWeek": 45,
      "visitsThisMonth": 120,
      "uniqueVisitorsToday": 8,
      "uniqueVisitorsThisWeek": 35
    },
    "topPages": [...],
    "popularProjects": [...],
    "dailyVisits": [...],
    "recentActivity": [...]
  }
}
```

### Tracking Routes (Public)

#### Track Page Visit
```http
POST /admin/track-visit
Content-Type: application/json

{
  "page": "/"
}
```

#### Track Project View
```http
POST /admin/track-project-view
Content-Type: application/json

{
  "projectId": "project_id",
  "projectTitle": "Project Title"
}
```

### Project Routes

#### Get All Projects (Public)
```http
GET /project
```

#### Get Single Project (Public)
```http
GET /project/:id
```

#### Create Project (Protected)
```http
POST /project/create
Authorization: Cookie (Token required)
Content-Type: application/json

{
  "title": "Project Title",
  "domain": "Web Development",
  "description": "Project description",
  "techStack": ["React", "Node.js", "MongoDB"],
  "githubUrl": "https://github.com/username/repo",
  "liveDemoUrl": "https://demo.com",
  "imageUrl": "/uploads/projects/image.jpg"
}
```

#### Update Project (Protected)
```http
PUT /project/:id
Authorization: Cookie (Token required)
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

#### Delete Project (Protected)
```http
DELETE /project/:id
Authorization: Cookie (Token required)
```

#### Upload Project Image (Protected)
```http
POST /project/upload-image
Authorization: Cookie (Token required)
Content-Type: multipart/form-data

{
  "projectImage": <file>
}
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "imageUrl": "/uploads/projects/projectImage-1234567890-123456789.jpg"
}
```

#### Get GitHub Repositories (Protected)
```http
GET /project/github/repos
Authorization: Cookie (Token required)
```

#### Create Project from GitHub Repository ⭐ *AI-Powered*
```http
POST /project/create-from-repo
Authorization: Cookie (Token required)
Content-Type: application/json

{
  "repoName": "repository-name"
}
```

**What this endpoint does:**
1. Fetches repository details from GitHub
2. Downloads and analyzes README content
3. Identifies programming languages used
4. Sends data to Google Gemini AI for intelligent analysis
5. Automatically creates a structured project with:
   - Professional title generation
   - Domain categorization
   - Compelling description
   - Technology stack identification
6. Falls back to raw GitHub data if AI quota is exceeded

## 🧠 AI Integration Features

The `/project/create-from-repo` endpoint uses Google Gemini AI to:

- **Analyze Repository Content**: Processes README files, repository descriptions, and metadata
- **Generate Professional Titles**: Creates clear, descriptive project titles
- **Categorize Projects**: Automatically determines the appropriate domain (Web Development, AI/ML, etc.)
- **Write Descriptions**: Generates compelling 2-3 sentence project descriptions
- **Identify Tech Stack**: Recognizes and lists technologies used in the project
- **Handle Edge Cases**: Robust fallback system if AI processing fails or quota is exceeded

## 📁 Project Structure

### Full-Stack Architecture
```
Portfolio/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── resume.pdf              # Resume file for download
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   │   ├── About.jsx
│   │   │   ├── BackgroundGradient.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ContactPopup.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── SEO.jsx
│   │   │   └── Skills.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Portfolio.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── api/                     # API service layer
│   │   │   └── index.js
│   │   ├── assets/                  # Static assets
│   │   │   └── images/
│   │   ├── App.jsx                  # Main App component with routing
│   │   └── main.jsx                 # Vite entry point
│   ├── package.json
│   └── vite.config.js              # Vite configuration
│
├── server/                          # Node.js Backend
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── projectController.js     # Project management & AI integration
│   │   └── analyticsController.js   # Analytics and tracking
│   ├── middlewares/
│   │   └── isLoggedIn.js           # Authentication middleware
│   ├── models/
│   │   ├── projectModel.js         # MongoDB project schema
│   │   ├── visitModel.js           # Visit tracking schema
│   │   └── projectViewModel.js    # Project view tracking schema
│   ├── routes/
│   │   ├── adminRouter.js          # Authentication and analytics routes
│   │   └── projectRouter.js        # Project management routes
│   ├── utils/
│   │   ├── generateToken.js        # JWT token generation
│   │   └── upload.js               # Multer configuration for file uploads
│   ├── config/
│   │   └── mongooseConnection.js   # Database connection
│   ├── public/
│   │   └── uploads/
│   │       └── projects/           # Uploaded project images
│   ├── .env                        # Environment variables
│   ├── package.json
│   └── index.js                    # Server entry point
│
└── README.md                        # Project documentation
```

## 🎨 Frontend Features

### Portfolio Page
- **Hero Section**: Animated hero with resume download button
- **About Section**: Bio with animated pills and stats
- **Skills Section**: Animated skill pills with hover effects
- **Projects Section**: Pinned scroll animation with project cards
- **Experience Section**: Timeline of work experience
- **Contact Section**: Interactive contact card with EmailJS integration
- **Scroll to Top**: Floating button with GSAP animations

### Admin Dashboard
- **Analytics Tab**: 
  - Overview statistics cards
  - Line chart for daily visits (last 30 days)
  - Bar chart for popular projects
  - Top pages and recent activity lists
- **Projects Tab**: 
  - Full CRUD operations
  - Image upload with drag & drop
  - Project form modal
- **GitHub Import Tab**: 
  - List of repositories
  - One-click import with AI analysis

## 🔒 Authentication Flow

1. **Admin Login**: POST to `/admin/login` with access code
2. **Token Generation**: Server generates JWT and sets httpOnly cookie
3. **Protected Routes**: All `/project/*` write routes require authentication
4. **Middleware Validation**: `isLoggedIn` middleware validates JWT tokens
5. **Session Management**: 
   - Tokens expire after 24 hours
   - Automatic redirect on 401 errors
   - Logout clears cookie and redirects to login
6. **Session Check**: Dashboard checks authentication on mount

## 💾 Database Schema

### Project Model
```javascript
{
  title: String (required),
  domain: String (required),
  description: String,
  techStack: [String],
  liveDemoUrl: String,
  githubUrl: String,
  imageUrl: String,              // Path to uploaded image
  createdAt: Date,
  updatedAt: Date
}
```

### Visit Model
```javascript
{
  page: String (required),
  ipHash: String (required),      // Hashed IP for privacy
  userAgent: String,
  timestamp: Date
}
```

### ProjectView Model
```javascript
{
  projectId: ObjectId (required),
  projectTitle: String (required),
  ipHash: String (required),      // Hashed IP for privacy
  timestamp: Date
}
```

## 🚀 Usage Examples

### 1. Authenticate as Admin
```bash
curl -X POST http://localhost:3000/admin/login \
  -H "Content-Type: application/json" \
  -d '{"code": "your_admin_code"}' \
  -c cookies.txt
```

### 2. Upload Project Image
```bash
curl -X POST http://localhost:3000/project/upload-image \
  -b cookies.txt \
  -F "projectImage=@/path/to/image.jpg"
```

### 3. Create Project with Image
```bash
curl -X POST http://localhost:3000/project/create \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "My Project",
    "domain": "Web Development",
    "description": "A cool project",
    "techStack": ["React", "Node.js"],
    "imageUrl": "/uploads/projects/image.jpg"
  }'
```

### 4. Get Analytics
```bash
curl -X GET http://localhost:3000/admin/analytics \
  -b cookies.txt
```

### 5. Create Project from Repository (AI-Powered)
```bash
curl -X POST http://localhost:3000/project/create-from-repo \
  -H "Content-Type: application/json" \
  -d '{"repoName": "Portfolio"}' \
  -b cookies.txt
```

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Same-Site Cookies**: CSRF protection
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Request data validation
- **File Upload Validation**: Image type and size validation
- **IP Hashing**: Privacy-focused visitor tracking
- **Error Handling**: Comprehensive error management
- **CORS Configuration**: Controlled cross-origin requests

## 📊 Analytics Features

- **Visitor Tracking**: Track page visits with privacy-focused IP hashing
- **Project Views**: Track which projects are most viewed
- **Daily Statistics**: View visits over the last 30 days
- **Popular Content**: Identify top pages and projects
- **Unique Visitors**: Approximate unique visitor counts
- **Visual Charts**: Line and bar charts for data visualization

## 🎯 SEO Features

- **Dynamic Meta Tags**: Page-specific titles and descriptions
- **Open Graph Tags**: Social media sharing optimization
- **Twitter Cards**: Enhanced Twitter sharing
- **Canonical URLs**: Prevent duplicate content issues
- **Dynamic Images**: Project images for social sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**LighTnos29** - [GitHub Profile](https://github.com/LighTnos29)

## 🙏 Acknowledgments

- Google Generative AI for intelligent project analysis
- GitHub API for repository data access
- MongoDB for reliable data storage
- Express.js for robust server framework
- GSAP for powerful animations
- Recharts for beautiful data visualizations

---

*Built with ❤️ using Node.js, MongoDB, React, and Google AI*
