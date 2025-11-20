const asyncHandler = require('express-async-handler');
const Property = require('../models/Property'); // Import the Property model
const { createListingFromData } = require('../services/propertyService');

/**
 * @desc Get all properties (with filtering, searching, and pagination)
 * @route GET /api/properties
 * @access Public
 */
const getProperties = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    // 1. Build Search/Filter Query
    const query = {};

    // Text Search (e.g., search by title or description)
    if (req.query.keyword) {
        query.$or = [
            { title: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } },
        ];
    }

    // Listing Type Filter (rent/sale)
    if (req.query.listingType) {
        query.listingType = req.query.listingType;
    }

    // Property Type Filter (house, apartment, land, commercial)
    if (req.query.propertyType) {
        query.propertyType = req.query.propertyType;
    }

    // Price Range Filter
    if (req.query.minPrice || req.query.maxPrice) {
        query.price = {};
        if (req.query.minPrice) {
            query.price.$gte = Number(req.query.minPrice);
        }
        if (req.query.maxPrice) {
            query.price.$lte = Number(req.query.maxPrice);
        }
    }
    
    // City/Location Filter
    if (req.query.city) {
        query['location.city'] = { $regex: req.query.city, $options: 'i' };
    }

    // 2. Pagination and Counting
    const count = await Property.countDocuments(query);
    const properties = await Property.find(query)
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        .populate('owner', 'username email phoneNumber'); // Fetch owner info

    res.json({ properties, page, pages: Math.ceil(count / pageSize), count });
});

/**
 * @desc Get single property by ID
 * @route GET /api/properties/:id
 * @access Public
 */
const getPropertyById = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id).populate('owner', 'username email phoneNumber role');

    if (property) {
        res.json(property);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

/**
 * @desc Create a new property listing
 * @route POST /api/properties
 * @access Private/Agent, Landlord
 */
const createProperty = asyncHandler(async (req, res) => {
    // The owner field is populated by the 'protect' middleware
    // We expect the request body to match the Property Schema structure
    const { 
        title, 
        description, 
        listingType, 
        propertyType, 
        price, 
        location, 
        details, 
        images 
    } = req.body;

    if (!title || !description || !listingType || !propertyType || !price || !location || !details || !images || images.length === 0) {
        res.status(400);
        throw new Error('Please fill in all required property fields: title, description, listing type, property type, price, location, details, and at least one image.');
    }

    const property = new Property({
        owner: req.user._id, // Set the owner to the logged-in user
        title,
        description,
        listingType,
        propertyType,
        price,
        location,
        details,
        images,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
});

/**
 * @desc Update an existing property listing
 * @route PUT /api/properties/:id
 * @access Private/Owner
 */
const updateProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        // Check if the logged-in user is the property owner
        if (property.owner.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to update this property');
        }
        
        // Update fields based on request body, ensuring owner is not changed
        property.title = req.body.title || property.title;
        property.description = req.body.description || property.description;
        property.listingType = req.body.listingType || property.listingType;
        property.propertyType = req.body.propertyType || property.propertyType;
        property.price = req.body.price || property.price;
        property.location = req.body.location || property.location;
        property.details = req.body.details || property.details;
        property.images = req.body.images || property.images;
        property.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : property.isAvailable;

        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

/**
 * @desc Delete a property listing
 * @route DELETE /api/properties/:id
 * @access Private/Owner
 */
const deleteProperty = asyncHandler(async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        // Check if the logged-in user is the property owner
        if (property.owner.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized to delete this property');
        }

        await Property.deleteOne({ _id: property._id });
        res.json({ message: 'Property removed successfully' });
    } else {
        res.status(404);
        throw new Error('Property not found');
    }
});

module.exports = {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
};