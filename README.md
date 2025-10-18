# Portfolio Full-Stack Application

A comprehensive full-stack portfolio application featuring a modern React frontend with stunning animations and a powerful Node.js backend with AI-powered project analysis using Google Gemini AI.

## 🚀 Features

### Frontend Features
- **Modern React Interface**: Built with React 18+ and modern hooks
- **Responsive Design**: Tailwind CSS for mobile-first, responsive layouts
- **Smooth Animations**: Advanced animations using Framer Motion, GSAP, and Lenis Scroll
- **Interactive Portfolio**: Dynamic project showcase with filtering and search
- **Admin Dashboard**: Secure admin interface for managing projects
- **Real-time Updates**: Live project management and GitHub integration

### Backend Features
- **Authentication System**: JWT-based admin authentication with secure cookie management
- **Project Management**: CRUD operations for portfolio projects
- **GitHub Integration**: Fetch public and private repositories
- **AI-Powered Analysis**: Automatically generate project descriptions using Google Gemini AI
- **Repository Processing**: Convert GitHub repositories into structured portfolio projects
- **Secure Middleware**: Protected routes with authentication middleware

## 🛠️ Technologies Used

### Frontend Stack
- **Framework**: React 18+ with modern hooks and context
- **Styling**: Tailwind CSS for utility-first responsive design
- **Animations**: 
  - **Framer Motion**: Component animations and page transitions
  - **GSAP**: Advanced timeline animations and scroll-triggered effects
  - **Lenis**: Smooth scroll implementation and scroll-based animations
- **State Management**: React Context API / Redux (if needed)
- **HTTP Client**: Axios for API communication
- **Build Tool**: Vite for fast development and optimized builds

### Backend Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **AI Integration**: Google Generative AI (Gemini 2.0 Flash)
- **GitHub API**: Repository data fetching and analysis
- **Security**: bcrypt for password hashing, cookie-parser for session management

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB database
- GitHub Personal Access Token
- Google Gemini AI API Key

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
   ```

4. **Start the backend server**
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

3. **Install animation libraries**
   ```bash
   npm install framer-motion gsap @studio-freight/lenis
   ```

4. **Set up Tailwind CSS** (if not already configured)
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

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

### Project Routes (`/project`) 🔒 *Protected*

#### Create Project Manually
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
  "liveDemoUrl": "https://demo.com"
}
```

#### Get Private Repositories
```http
GET /project/private
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

## 🧠 AI Integration Features

The `/project/create-from-repo` endpoint uses Google Gemini AI to:

- **Analyze Repository Content**: Processes README files, repository descriptions, and metadata
- **Generate Professional Titles**: Creates clear, descriptive project titles
- **Categorize Projects**: Automatically determines the appropriate domain (Web Development, AI/ML, etc.)
- **Write Descriptions**: Generates compelling 2-3 sentence project descriptions
- **Identify Tech Stack**: Recognizes and lists technologies used in the project
- **Handle Edge Cases**: Robust fallback system if AI processing fails

## 📁 Project Structure

### Full-Stack Architecture
```
Portfolio/
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/              # Reusable UI Components
│   │   │   ├── ui/                  # Base UI components
│   │   │   ├── animations/          # Animation components
│   │   │   ├── layout/              # Layout components
│   │   │   └── forms/               # Form components
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── About.jsx
│   │   │   └── Admin/
│   │   │       ├── Dashboard.jsx
│   │   │       └── ProjectManager.jsx
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAnimation.js
│   │   │   ├── useScrollTrigger.js
│   │   │   └── useAuth.js
│   │   ├── context/                 # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── ProjectContext.jsx
│   │   ├── utils/                   # Utility functions
│   │   │   ├── api.js               # Axios configurations
│   │   │   ├── animations.js        # GSAP & animation helpers
│   │   │   └── constants.js
│   │   ├── styles/                  # Global styles
│   │   │   ├── globals.css
│   │   │   └── animations.css
│   │   ├── App.jsx                  # Main App component
│   │   └── main.jsx                 # Vite entry point
│   ├── package.json
│   ├── vite.config.js              # Vite configuration
│   ├── tailwind.config.js          # Tailwind CSS config
│   └── postcss.config.js           # PostCSS config
│
├── server/                          # Node.js Backend
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   └── projectController.js     # Project management & AI integration
│   ├── middlewares/
│   │   └── isLoggedIn.js           # Authentication middleware
│   ├── models/
│   │   └── projectModel.js         # MongoDB project schema
│   ├── routes/
│   │   ├── adminRouter.js          # Authentication routes
│   │   └── projectRouter.js        # Project management routes
│   ├── utils/
│   │   └── generateToken.js        # JWT token generation
│   ├── config/
│   │   └── mongooseConnection.js   # Database connection
│   ├── .env                        # Environment variables
│   ├── .gitignore                 # Git ignore rules
│   ├── package.json
│   └── index.js                    # Server entry point
│
└── README.md                        # Project documentation
```

## 🎨 Animation Implementation

### Framer Motion - Component Animations
```jsx
// Page transitions and component animations
import { motion, AnimatePresence } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, x: '-100vw' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '100vw' }
}

const ProjectCard = ({ project }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-6 rounded-lg shadow-lg"
  >
    {/* Project content */}
  </motion.div>
)
```

### GSAP - Advanced Timeline Animations
```javascript
// ScrollTrigger animations and complex timelines
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Hero section animation
const heroTimeline = gsap.timeline()
heroTimeline
  .from('.hero-title', { duration: 1, y: 100, opacity: 0 })
  .from('.hero-subtitle', { duration: 1, y: 50, opacity: 0 }, '-=0.5')
  .from('.hero-cta', { duration: 1, scale: 0, opacity: 0 }, '-=0.3')

// Scroll-triggered project reveals
gsap.from('.project-item', {
  duration: 1,
  y: 100,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.projects-container',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1
  }
})
```

### Lenis - Smooth Scroll Implementation
```javascript
// Smooth scroll setup
import Lenis from '@studio-freight/lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

// Animation frame loop
function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)

// Integrate with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
```

## 🌊 Frontend Features & Components

### Interactive Portfolio Showcase
- **Project Grid**: Animated masonry layout with filtering
- **Project Details**: Modal with smooth transitions
- **Tech Stack Visualization**: Animated skill indicators
- **GitHub Integration**: Live repository stats and links

### Admin Dashboard
- **Secure Login**: JWT-based authentication flow
- **Project Management**: CRUD operations with real-time updates
- **Repository Import**: AI-powered project creation from GitHub
- **Analytics**: Project performance and visitor statistics

### Animation Features
- **Page Transitions**: Smooth route changes with Framer Motion
- **Scroll Animations**: GSAP-powered scroll-triggered effects  
- **Micro-interactions**: Hover effects and loading animations
- **Parallax Effects**: Multi-layer scrolling backgrounds
- **Smooth Scrolling**: Lenis-powered buttery smooth navigation

## 🔒 Authentication Flow

1. **Admin Login**: POST to `/admin/login` with access code
2. **Token Generation**: Server generates JWT and sets secure cookie
3. **Protected Routes**: All `/project/*` routes require authentication
4. **Middleware Validation**: `isLoggedIn` middleware validates JWT tokens
5. **Session Management**: Tokens expire after 24 hours

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
  createdAt: Date,
  updatedAt: Date
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

### 2. Get Repository List
```bash
curl -X GET http://localhost:3000/project/private \
  -b cookies.txt
```

### 3. Create Project from Repository (AI-Powered)
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
- **Error Handling**: Comprehensive error management

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

---

*Built with ❤️ using Node.js, MongoDB, and Google AI*
