// server/models/Property.js

const mongoose = require('mongoose');

// --- Sub-Schema: Location ---
// Defines the geographical and address structure for a property
const LocationSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    county: {
        type: String, // Can be State, Province, or County depending on region
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    coordinates: {
        lat: { type: Number },
        lng: { type: Number },
    },
});

// --- Sub-Schema: Details (The conditional fields) ---
// Contains fields relevant only to certain property types (e.g., bedrooms for a house, area for land)
const DetailsSchema = new mongoose.Schema({
    // Residential/Commercial details (for 'house', 'apartment', 'commercial')
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    size: { 
        type: Number, // In square footage or square meters
    },
    
    // Land details (for 'land')
    landArea: { 
        type: Number, // In acres, hectares, or square meters
    },

    // General
    amenities: {
        type: [String], // e.g., ['Parking', 'Swimming Pool', 'Gym']
        default: [],
    },
});


// --- Main Property Schema ---
const PropertySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Links to the User who posted the property
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    listingType: {
        type: String,
        enum: ['rent', 'sale'], // Determines if it's for rent or sale
        required: true,
    },
    propertyType: {
        type: String,
        enum: ['house', 'apartment', 'land', 'commercial'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    
    // Embedded Schemas
    location: {
        type: LocationSchema, // Uses the structured location sub-schema
        required: true,
    },
    details: {
        type: DetailsSchema, // Uses the structured details sub-schema
        required: true,
    },

    images: {
        type: [String], // Array of URLs for property images
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length > 0; // Ensures at least one image is provided
            },
            message: 'A property must have at least one image URL.',
        }
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    
}, { timestamps: true }); // Mongoose adds createdAt and updatedAt fields

module.exports = mongoose.model('Property', PropertySchema);