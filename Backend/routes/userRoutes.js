const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('../Controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware'); // We will define 'admin' shortly

// Route for getting all users (Admin only)
router.get('/', protect, admin, getUsers); // GET /api/users

// Routes for individual user management (Admin/Self)
router.route('/:id')
    .get(protect, admin, getUserById)  // GET /api/users/:id (Admin only)
    .put(protect, updateUser)         // PUT /api/users/:id (Admin or Self)
    .delete(protect, deleteUser);     // DELETE /api/users/:id (Admin or Self)

module.exports = router;