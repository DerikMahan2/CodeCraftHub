const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/:username', protect, updateUser);
// Add more routes for getting user, updating user, etc.

module.exports = router;