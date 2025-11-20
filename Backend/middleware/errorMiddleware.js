// server/middleware/errorMiddleware.js

/**
 * Custom error handler for standardizing response format
 * @param {Error} err - The error object
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 */
const errorHandler = (err, req, res, next) => {
    // Determine the status code. If a status code was already set (e.g., 401, 404), use it.
    // Otherwise, default to 500 (Server Error).
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode);

    // Send the structured JSON response
    res.json({
        message: err.message,
        // Only include the stack trace in development mode for debugging
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

/**
 * Handles 404 - Not Found errors for unmatched routes
 * @param {Request} req - The express request object
 * @param {Response} res - The express response object
 * @param {NextFunction} next - The express next function
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the global errorHandler
};

module.exports = {
    errorHandler,
    notFound,
};