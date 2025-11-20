// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getUserProfile 
} = require('../Controllers/authController');
const { protect } = require('../middleware/authMiddleware'); // We will define this later

// Public routes (no authentication needed)
router.post('/register', registerUser); // POST to /api/auth/register
router.post('/login', loginUser);     // POST to /api/auth/login

// Protected route (authentication needed)
// Uses 'protect' middleware to ensure a user is logged in before getting their profile
router.get('/profile', protect, getUserProfile); // GET to /api/auth/profile

module.exports = router;