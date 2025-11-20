// server/routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const { 
    getProperties, 
    getPropertyById, 
    createProperty, 
    updateProperty, 
    deleteProperty 
} = require('../Controllers/propertyController');
const { protect, agentOrLandlord } = require('../middleware/authMiddleware'); // 'protect' and 'agentOrLandlord' roles

// Public Routes (Anyone can view listings)
router.get('/', getProperties); // GET to /api/properties (for searching and listing all)
router.get('/:id', getPropertyById); // GET to /api/properties/:id (get a single property)

// Protected Routes (Only authenticated users, specifically agents/landlords, can modify listings)
router.post('/', protect, agentOrLandlord, createProperty); // POST to /api/properties
router.put('/:id', protect, updateProperty);              // PUT to /api/properties/:id
router.delete('/:id', protect, deleteProperty);           // DELETE to /api/properties/:id

module.exports = router;