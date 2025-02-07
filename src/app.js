// Main application configuration file
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Request logging middleware for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Connect to MongoDB
connectDB();

// Root route for API health check
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.json({ message: 'Welcome to the User Service API' });
});

// Routes
app.use('/api/users', userRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;