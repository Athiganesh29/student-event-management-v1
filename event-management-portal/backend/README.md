# ZVENT Backend Authentication System

This is the backend API for the ZVENT event management system, providing user authentication with MongoDB.

## Features

- ✅ User Registration (Signup)
- ✅ User Login with JWT tokens
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ CORS enabled for frontend
- ✅ MongoDB integration
- ✅ Error handling

## Setup Instructions

### 1. Install Dependencies
```bash
cd event-management-portal/backend
npm install
```

### 2. Install MongoDB
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service
- Default connection: `mongodb://localhost:27017`

### 3. Environment Configuration
The `.env` file is already configured with:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zvent
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### 5. Test the API
- Health check: http://localhost:5000/api/health
- Signup: POST http://localhost:5000/api/auth/signup
- Login: POST http://localhost:5000/api/auth/login

## API Endpoints

### Authentication

#### POST /api/auth/signup
Register a new user
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "password": "Password123",
  "newsletter": true
}
```

#### POST /api/auth/login
Login with email and password
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### GET /api/auth/profile
Get user profile (requires authentication)
Headers: `Authorization: Bearer <token>`

## Database Schema

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  newsletter: Boolean (default: false),
  isVerified: Boolean (default: false),
  createdAt: Date,
  lastLogin: Date
}
```

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Error handling without sensitive data exposure

## Frontend Integration

The frontend is configured to connect to:
- API Base URL: `http://localhost:5000/api`
- Authentication tokens stored in localStorage/sessionStorage
- Automatic redirect on authentication success/failure
