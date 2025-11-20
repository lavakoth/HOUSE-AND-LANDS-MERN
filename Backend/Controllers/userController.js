const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Import the User model

/**
 * @desc Get all users
 * @route GET /api/users
 * @access Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
    // We assume 'admin' middleware ensures only admins reach this point
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    if (users) {
        res.json(users);
    } else {
        res.status(404);
        throw new Error('No users found.');
    }
});

/**
 * @desc Get user by ID
 * @route GET /api/users/:id
 * @access Private/Admin
 */
const getUserById = asyncHandler(async (req, res) => {
    // We exclude the password hash from the result
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc Update user profile (Admin or Self-Update)
 * @route PUT /api/users/:id
 * @access Private/Admin or User
 */
const updateUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
        // Authorization Check: Only Admin OR the user themselves can update
        const isAdmin = req.user.role === 'admin';
        const isSelf = req.user._id.toString() === userId;

        if (!isAdmin && !isSelf) {
            res.status(401);
            throw new Error('Not authorized to update this user profile.');
        }

        // Prevent non-admins from changing their own role unless explicitly allowed by the business logic
        // Admin can update all fields, including 'role'
        // Non-admin users can only update basic details (name, phone, picture)
        if (!isAdmin && req.body.role) {
            res.status(403);
            throw new Error('Forbidden: Users cannot change their own role.');
        }

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.profilePicture = req.body.profilePicture || user.profilePicture;
        
        // Only update role if the current user is an admin
        if (isAdmin && req.body.role) {
            user.role = req.body.role;
        }

        // Note: Password change logic would typically be in a separate, dedicated route
        // We skip it here for simplicity and security

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            phoneNumber: updatedUser.phoneNumber,
        });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * @desc Delete user profile
 * @route DELETE /api/users/:id
 * @access Private/Admin or User
 */
const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
        // Authorization Check: Only Admin OR the user themselves can delete
        const isAdmin = req.user.role === 'admin';
        const isSelf = req.user._id.toString() === userId;
        
        if (!isAdmin && !isSelf) {
            res.status(401);
            throw new Error('Not authorized to delete this user profile.');
        }
        
        // Prevent deletion of the last admin account (optional safety check)
        if (isAdmin && user.role === 'admin' && await User.countDocuments({ role: 'admin' }) === 1) {
            res.status(403);
            throw new Error('Cannot delete the last administrator account.');
        }
        
        await User.deleteOne({ _id: userId });
        res.json({ message: 'User removed successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};