const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

/**
 * Generate JWT token for user authentication
 * @param {string} id - User ID to encode in token
 * @returns {string} JWT token
 */
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

/**
 * Register new user
 * POST /api/users/register
 */
const registerUser = async (req, res) => {
    try {
        await userService.registerUser(req.body);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

/**
 * Authenticate user & get token
 * POST /api/users/login
 */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

/**
 * Update user profile
 * PUT /api/users/:username
 * @requires Auth
 */
const updateUser = async (req, res) => {
    try {
        await userService.updateUser(req.user.id, req.body.newUsername);
        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add more user-related functions (e.g., get user, update user, etc.)

module.exports = { registerUser, loginUser, updateUser };