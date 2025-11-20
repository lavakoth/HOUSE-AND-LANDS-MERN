const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * @desc Middleware to protect routes (Authentication Check)
 * @notes This function verifies the JWT token and sets req.user
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if the authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get token from header (format is "Bearer <token>")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get user from the token's payload (which contains the user ID)
            // We select('-password') to exclude the password hash from the request object
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401); // Unauthorized
                throw new Error('User not found (invalid token payload)');
            }
            
            // Proceed to the next middleware or controller function
            next();

        } catch (error) {
            console.error(error);
            res.status(401); // Unauthorized
            throw new Error('Not authorized, token failed or expired');
        }
    }

    if (!token) {
        res.status(401); // Unauthorized
        throw new Error('Not authorized, no token provided');
    }
});

/**
 * @desc Authorization Check: Ensures user role is 'admin'
 * @notes This must be used AFTER the 'protect' middleware
 */
const admin = (req, res, next) => {
    // req.user is guaranteed to be set by the 'protect' middleware
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed
    } else {
        res.status(403); // Forbidden
        throw new Error('Not authorized as an administrator');
    }
};

/**
 * @desc Authorization Check: Ensures user role is 'agent' or 'landlord'
 * @notes Required for creating property listings
 */
const agentOrLandlord = (req, res, next) => {
    // Check if user exists (from protect) and has one of the required roles
    if (req.user && (req.user.role === 'agent' || req.user.role === 'landlord')) {
        next(); // User has permission, proceed
    } else {
        res.status(403); // Forbidden
        throw new Error('Not authorized. Only Agents or Landlords can create listings.');
    }
};

module.exports = {
    protect,
    admin,
    agentOrLandlord,
};