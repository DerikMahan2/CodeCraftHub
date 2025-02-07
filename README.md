# User Service API

A RESTful API service for user management built with Node.js, Express, and MongoDB. This service provides secure user authentication, profile management, and data validation.

## Features

- User Registration with validation
- User Authentication with JWT tokens
- User Profile Updates with authorization
- Input Validation using Joi
- Docker Containerization with MongoDB
- Comprehensive Error Handling
- Protected Routes with Middleware
- Service Layer Architecture
- API Documentation

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- Docker and Docker Compose (for containerized deployment)
- npm or yarn package manager
- Postman (for API testing)

## Installation

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd user-service-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the root directory:
   ```bash
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/userdb
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start MongoDB locally:
   ```bash
   mongod
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Docker Deployment

1. Build and start the containers:
   ```bash
   docker-compose up -d --build
   ```

2. The API will be available at `http://localhost:3000`

3. Stop the containers:
   ```bash
   docker-compose down
   ```

## API Endpoints

### User Routes

#### 1. Register User
- **POST** `/api/users/register`
- **Body:**
```json
{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
}
```
- **Response:** 201 Created
```json
{
    "message": "User created successfully"
}
```

#### 2. Login User
- **POST** `/api/users/login`
- **Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```
- **Response:** 200 OK
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. Update User Profile
- **PUT** `/api/users/:username`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
    "newUsername": "john_smith"
}
```
- **Response:** 200 OK
```json
{
    "message": "User profile updated successfully"
}
```

## Validation Rules

### User Registration
- **Username:**
  - Required
  - 3-30 characters
  - Alphanumeric
- **Email:**
  - Required
  - Valid email format
  - Unique in database
- **Password:**
  - Required
  - Minimum 6 characters

### User Login
- **Email:**
  - Required
  - Valid email format
- **Password:**
  - Required

### Profile Update
- **New Username:**
  - Required
  - 3-30 characters
  - Alphanumeric

## Project Structure

```
src/
├── config/
│   └── db.js                 # Database configuration
├── controllers/
│   └── userController.js     # Request handlers
├── middleware/
│   └── authMiddleware.js     # JWT authentication
├── models/
│   └── userModel.js         # User database schema
├── routes/
│   └── userRoutes.js        # API routes
├── services/
│   └── userService.js       # Business logic
├── utils/
│   └── validation.js        # Input validation
├── app.js                   # Express application
└── index.js                 # Application entry point
```

## Error Handling

### HTTP Status Codes
- **200:** Success
- **201:** Created
- **400:** Bad Request
- **401:** Unauthorized
- **404:** Not Found
- **500:** Internal Server Error

### Error Response Format
```json
{
    "message": "Error description"
}
```

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Input validation and sanitization
- Protected routes middleware
- Error message sanitization
- MongoDB injection protection

## Docker Configuration

### Dockerfile
- Node.js 18 slim image
- Multi-stage build
- Production optimization

### Docker Compose
- Node.js application container
- MongoDB container
- Persistent volume for database
- Internal network
- Environment variables

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Application port | 3000 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/userdb |
| JWT_SECRET | JWT signing key | Required |

## Development

1. Install dependencies:
```bash
npm install
```

2. Start MongoDB:
```bash
mongod
```

3. Run in development mode:
```bash
npm run dev
```

## Testing

1. Run tests:
```bash
npm test
```

2. Run with coverage:
```bash
npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Express.js for the web framework
- MongoDB for the database
- JWT for authentication
- Joi for validation
- Docker for containerization