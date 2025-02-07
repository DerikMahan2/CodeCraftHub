// User service layer - handles business logic
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class UserService {
    /**
     * Generate JWT token for user authentication
     * @param {string} id - User ID to encode in token
     * @returns {string} JWT token
     */
    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
    }

    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Created user object
     */
    async registerUser(userData) {
        const { username, email, password } = userData;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error('User already exists');
        }

        // Create new user
        const user = await User.create({
            username,
            email,
            password
        });

        return user;
    }

    /**
     * Authenticate user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<Object>} User object with token
     */
    async loginUser(email, password) {
        const user = await User.findOne({ email });
        
        if (user && (await user.matchPassword(password))) {
            return {
                token: this.generateToken(user._id)
            };
        }
        
        throw new Error('Invalid email or password');
    }

    /**
     * Update user profile
     * @param {string} userId - User ID
     * @param {string} newUsername - New username
     * @returns {Promise<Object>} Updated user object
     */
    async updateUser(userId, newUsername) {
        const user = await User.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        if (newUsername) {
            user.username = newUsername;
            await user.save();
            return user;
        }
        
        throw new Error('Please provide a new username');
    }
}

module.exports = new UserService();
