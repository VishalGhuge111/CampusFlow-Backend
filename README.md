# 🚀 CampusFlow Backend Server

A robust Node.js backend for task management system built with Express, MongoDB, and advanced authentication features.

**Live URL:** https://campusflow-backend-9uxk.onrender.com

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Email Service](#email-service)
- [Database](#database)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

CampusFlow Backend is a comprehensive task management API that enables users to:
- Register and authenticate securely
- Create, read, update, and delete tasks
- Manage user profiles
- Reset passwords with OTP verification
- Send transactional emails via Brevo

The backend is built with industry-standard practices and deployed on Render.

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.18+ | REST API framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 7.0+ | ODM (Object Document Mapper) |
| **JWT** | - | Authentication & authorization |
| **Bcryptjs** | 2.4.3 | Password hashing & security |
| **Dotenv** | 16.0+ | Environment configuration |
| **Axios** | 1.6+ | HTTP client for API calls |
| **Nodemailer** | 6.9+ | Email transport (legacy) |
| **Brevo API** | v3 | Transactional email service |
| **CORS** | 2.8+ | Cross-Origin Resource Sharing |
| **Nodemon** | 3.0+ | Development auto-reload |

---

## ✨ Features

### 🔐 Authentication & Security
- User registration with OTP verification
- Secure JWT-based authentication
- Password hashing with bcryptjs (salt rounds: 10)
- Forgot password with OTP reset flow
- Email verification before account activation
- Token-based authorization for protected routes

### 📝 Task Management
- Create new tasks with title, description, and status
- Retrieve all tasks for authenticated users
- Update task details and status
- Delete tasks with authorization checks
- Task filtering and sorting capabilities

### 👤 User Management
- Complete user profile management
- Update user information
- Retrieve user details
- Account settings management

### 💌 Email Services
- OTP delivery for registration
- Password reset emails
- Welcome emails
- Transactional email via Brevo HTTP API
- HTTPS-based email delivery (port 443)

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- Brevo account for email service
- Git installed

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/VishalGhuge111/CampusFlow-Backend.git
cd CampusFlow-Backend
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** in the server directory
```bash
touch .env
```

4. **Add environment variables** (see Environment Variables section)

5. **Start development server**
```bash
npm run dev
```

The server will run on `http://localhost:5000`

---

## 🔑 Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here

# Email Service (Brevo)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### Getting Brevo API Key
1. Visit [Brevo Dashboard](https://app.brevo.com)
2. Navigate to **SMTP & API** → **API Keys & MCP**
3. Click **Create API Key**
4. Copy and paste the key in `.env` as `BREVO_API_KEY`

### Getting MongoDB URI
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Replace username and password in URI

---

## 📁 Project Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic (register, login, OTP verification)
│   ├── taskController.js     # Task CRUD operations
│   └── userController.js     # User profile management
├── middleware/
│   └── authMiddleware.js     # JWT verification & authorization
├── models/
│   ├── User.js               # User schema & validation
│   └── Task.js               # Task schema & validation
├── routes/
│   ├── authRoutes.js         # Authentication endpoints
│   ├── taskRoutes.js         # Task management endpoints
│   └── userRoutes.js         # User management endpoints
├── utils/
│   └── sendEmail.js          # Brevo HTTP API email service
├── .env                      # Environment variables (git ignored)
├── server.js                 # Express app initialization & server startup
└── package.json              # Dependencies & scripts
```

---

## 🔌 API Endpoints

### Base URL
```
Development: http://localhost:5000
Production: https://campusflow-backend-9uxk.onrender.com
```

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Register new user | ❌ |
| POST | `/login` | User login with credentials | ❌ |
| POST | `/verify-otp` | Verify OTP for registration | ❌ |
| POST | `/forgot-password` | Request password reset OTP | ❌ |
| POST | `/reset-password` | Reset password with OTP | ❌ |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all user tasks | ✅ |
| POST | `/` | Create new task | ✅ |
| GET | `/:id` | Get specific task | ✅ |
| PUT | `/:id` | Update task | ✅ |
| DELETE | `/:id` | Delete task | ✅ |

### User Routes (`/api/users`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/profile` | Get user profile | ✅ |
| PUT | `/profile` | Update user profile | ✅ |
| GET | `/:id` | Get user details | ✅ |

---

## 🔐 Authentication

### JWT Implementation
- **Header:** `Authorization: Bearer <token>`
- **Algorithm:** HS256
- **Expiration:** Configurable (default: 24 hours)
- **Secret:** Stored in `.env` as `JWT_SECRET`

### Request Example
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Protected Routes Middleware
All routes in `/api/tasks` and `/api/users/profile` require valid JWT token.

---

## 💌 Email Service

### Brevo HTTP API Integration
- **Service:** Brevo Transactional Email
- **Protocol:** HTTPS (Port 443)
- **Method:** REST API
- **Why:** Bypasses firewall restrictions on Render free tier

### Email Types
1. **Registration OTP** - 6-digit code for email verification
2. **Password Reset OTP** - 6-digit code for account recovery
3. **Welcome Email** - Sent after successful registration

### OTP Details
- **Validity:** 10 minutes
- **Length:** 6 digits
- **Resend:** Available after 30 seconds

### Email Implementation
```javascript
// sendEmail.js uses axios for HTTP requests
const sendEmail = async (to, subject, text) => {
  // Makes HTTPS call to Brevo API
  // Includes authentication via api-key header
  // Returns messageId on success
}
```

---

## 🗄️ Database

### MongoDB Connection
- **Provider:** MongoDB Atlas
- **Connection:** MongoDB+SRV protocol
- **Retry:** Auto-retry enabled
- **Timeout:** 30 seconds

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  otp: String,
  otpExpiry: Date,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

#### Tasks Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String,
  description: String,
  status: String (pending/completed),
  priority: String (low/medium/high),
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Deployed On: Render
**Live URL:** https://campusflow-backend-9uxk.onrender.com

### Deployment Steps

1. **Push code to GitHub**
```bash
git add .
git commit -m "Your message"
git push origin main
```

2. **Connect Render to GitHub**
   - Visit [Render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - Select `server` directory as root
   - Set Start Command: `npm start`

3. **Set Environment Variables on Render**
   - Dashboard → Environment
   - Add all variables from `.env`:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `BREVO_API_KEY`
     - `PORT`
     - `CLIENT_URL`

4. **Deploy**
   - Click Deploy
   - Wait for build to complete
   - Service will be live at provided URL

### Important Notes
- Render free tier blocks SMTP ports (587)
- We use HTTPS (port 443) for email - always allowed
- Auto-redeploy on git push if connected
- Logs available in Render dashboard

---

## 🧪 Testing

### Test Registration
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

### Test Create Task
```bash
POST http://localhost:5000/api/tasks
Authorization: Bearer <your_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the campus task manager",
  "status": "pending",
  "dueDate": "2026-02-28"
}
```

---

## 🛡️ Security Best Practices

✅ **Implemented**
- Password hashing with bcryptjs
- JWT-based authentication
- CORS protection
- Environment variable isolation
- Input validation
- Error handling without exposing internals
- HTTPS for email delivery
- OTP expiration checks

⚠️ **Production Recommendations**
- Use HTTPS only
- Implement rate limiting
- Add request validation schemas
- Use security headers (helmet.js)
- Implement logging & monitoring
- Regular security audits

---

## 📚 Documentation

### API Documentation
- **Postman Collection:** [Available upon request]
- **Base URL:** https://campusflow-backend-9uxk.onrender.com
- **Response Format:** JSON

### Error Codes
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 🎉 Acknowledgments

Built with ❤️ by ME
- Express.js community
- MongoDB documentation
- Brevo API support
- Render hosting platform

---

**Last Updated:** January 28, 2026
**Status:** Production Ready ✅
