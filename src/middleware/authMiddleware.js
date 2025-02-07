// Authentication middleware for protecting routes
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Middleware to protect routes that require authentication
 * Verifies JWT token and attaches user to request object
 */
const protect = async (req, res, next) => {
    let token;

    // Check if token exists in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from Bearer header
            token = req.headers.authorization.split(' ')[1];

            // Verify token using JWT secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find user by ID from token and exclude password
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    }

    // If no token is provided
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
