// server/services/propertyService.js

const Property = require('../models/Property');

/**
 * Simulates fetching and validating data from a third-party source
 * before creating a listing.
 * NOTE: In a real application, this might involve cURL requests, API keys,
 * and complex data mapping.
 * @param {string} externalId - ID used to fetch data from an external feed.
 * @returns {object} A standardized property data object or null.
 */
const fetchExternalPropertyData = async (externalId) => {
    console.log(`[PropertyService] Attempting to fetch external data for ID: ${externalId}`);

    // --- MOCK API CALL START ---
    // In production, you would use axios/fetch here to hit a third-party API.
    if (externalId === 'EXT12345') {
        // Successful mock response
        return {
            title: "Luxurious Riverside Apartment",
            description: "A stunning 3-bedroom apartment overlooking the city river.",
            listingType: "rent",
            propertyType: "apartment",
            price: 2500,
            location: {
                address: "45 Riverfront Drive, Unit 7B",
                city: "Metropolis",
                county: "Capital County",
                country: "USA",
                coordinates: { lat: 40.7128, lng: -74.0060 }
            },
            details: {
                bedrooms: 3,
                bathrooms: 2,
                size: 1500, // sq ft
                amenities: ["Balcony", "Gym Access", "24/7 Security"]
            },
            images: ['https://placehold.co/800x600/0000FF/FFFFFF?text=Apt+View'],
        };
    } else {
        // Failed mock response
        return null;
    }
    // --- MOCK API CALL END ---
};


/**
 * Orchestrates the creation of a new property listing, potentially
 * interacting with external systems or multiple database collections.
 * @param {object} propertyData - The raw data from the controller.
 * @param {string} userId - The ID of the user listing the property.
 * @returns {object} The created property document.
 */
const createListingFromData = async (propertyData, userId) => {
    // 1. You could call fetchExternalPropertyData here if the controller
    // supplied an external ID instead of raw data.

    // Example of a complex validation step that belongs in a Service:
    if (propertyData.propertyType === 'land' && !propertyData.details.landArea) {
        throw new Error("Land listings require a specified land area.");
    }
    
    // 2. Create the final property object
    const property = new Property({
        owner: userId,
        ...propertyData,
        isAvailable: true, // Default set in schema, but service can override
    });

    // 3. Save to database
    const createdProperty = await property.save();

    // 4. (Hypothetical) Post-creation action, like triggering an email to an admin
    console.log(`[PropertyService] New property listing created by user ${userId}.`);
    
    return createdProperty;
};

module.exports = {
    fetchExternalPropertyData,
    createListingFromData,
};