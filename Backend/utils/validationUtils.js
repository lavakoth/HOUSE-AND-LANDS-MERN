// server/utils/validationUtils.js

/**
 * Checks if a string is a valid email format.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
    // Basic regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Checks if a string meets minimum password complexity requirements.
 * (e.g., at least 8 characters long)
 * @param {string} password - The password string to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
const isStrongPassword = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, and one number.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};

/**
 * Checks if a given string is one of the allowed roles.
 * @param {string} role - The role string to validate.
 * @returns {boolean} True if the role is valid, false otherwise.
 */
const isValidRole = (role) => {
    const allowedRoles = ['buyer', 'renter', 'agent', 'landlord', 'admin'];
    return allowedRoles.includes(role);
};

module.exports = {
    isValidEmail,
    isStrongPassword,
    isValidRole,
};