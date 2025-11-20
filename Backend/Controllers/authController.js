const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

// Helper function to generate a JWT token
const generateToken = (id) => {
    // Uses the JWT_SECRET from the .env file
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, role, firstName, lastName } = req.body;

    // 1. Basic Validation
    if (!username || !email || !password || !firstName || !lastName) {
        res.status(400);
        throw new Error('Please fill in all required fields (username, email, password, first name, last name).');
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists with that email address.');
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the new user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || 'buyer', // Default role to 'buyer' if not provided
        firstName,
        lastName,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            token: generateToken(user._id), // Send JWT token for immediate login
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

/**
 * @desc Authenticate a user and get token
 * @route POST /api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1. Check for user by email
    const user = await User.findOne({ email });

    // 2. Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

/**
 * @desc Get user profile
 * @route GET /api/auth/profile
 * @access Private
 * NOTE: This relies on the 'protect' middleware to attach the user object to req.user
 */
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is populated by the 'protect' middleware
    const user = await User.findById(req.user._id).select('-password'); // Exclude the password hash

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
};