// User route definitions
const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateRequest, schemas } = require('../utils/validation');

const router = express.Router();

// Public routes with validation
router.post('/register', validateRequest(schemas.registerSchema), registerUser);
router.post('/login', validateRequest(schemas.loginSchema), loginUser);

// Protected routes with validation
router.put('/:username', protect, validateRequest(schemas.updateSchema), updateUser);

module.exports = router;