const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

connectDB();

// Add a root route handler
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.json({ message: 'Welcome to the User Service API' });
});

app.use('/api/users', userRoutes);

// Add error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;