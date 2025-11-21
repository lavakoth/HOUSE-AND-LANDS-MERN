// src/data/mockData.js
export const MockProperties = [
  {
    _id: "1",
    title: "Sunny Lakeview Condo",
    price: 320000,
    listingType: "sale",
    propertyType: "condo",
    location: { city: "Miami", country: "FL" },
    details: { bedrooms: 2, bathrooms: 2, size: 1200 },
    images: ["https://placehold.co/800x600/F8D7DA/000000?text=Condo+1"]
  },
  {
    _id: "2",
    title: "Spacious Modern Duplex",
    price: 2100,
    listingType: "rent",
    propertyType: "duplex",
    location: { city: "Dallas", country: "TX" },
    details: { bedrooms: 3, bathrooms: 2.5, size: 1800 },
    images: ["https://placehold.co/800x600/D1E7DD/000000?text=Duplex+2"]
  },
  {
    _id: "3",
    title: "Luxury Estate with Pool",
    price: 1500000,
    listingType: "sale",
    propertyType: "house",
    location: { city: "Beverly Hills", country: "CA" },
    details: { bedrooms: 5, bathrooms: 4, size: 4500 },
    images: ["https://placehold.co/800x600/CFF4FC/000000?text=Estate+3"]
  }
];