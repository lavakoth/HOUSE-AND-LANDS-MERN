// src/pages/HomePage.jsx
import React from "react";
import Button from "../components/Button";
import FeaturedPropertyCard from "../components/FeaturedPropertyCard";
import { Key, Search, TrendingUp } from "lucide-react";

const HomePage = ({ setPage, navigateToDetails }) => {
  const featured = [
    {
      _id: "1",
      title: "Sunny Lakeview Condo",
      price: 320000,
      type: "Sale",
      location: "Miami, FL",
      bedrooms: 2,
      bathrooms: 2,
      image: "https://placehold.co/400x250/F8D7DA/000000?text=Featured+Condo",
    },
    {
      _id: "2",
      title: "Spacious Modern Duplex",
      price: 2100,
      type: "Rent",
      location: "Dallas, TX",
      bedrooms: 3,
      bathrooms: 2.5,
      image: "https://placehold.co/400x250/D1E7DD/000000?text=Featured+Duplex",
    },
    {
      _id: "3",
      title: "Luxury Estate with Pool",
      price: 1500000,
      type: "Sale",
      location: "Beverly Hills, CA",
      bedrooms: 5,
      bathrooms: 4,
      image: "https://placehold.co/400x250/CFF4FC/000000?text=Featured+Estate",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="relative bg-darkblue-300 shadow-x1 rounded-2xl overflow-hidden min-h-130 flex items-center justify-center p-8 border-1 border-blue-100">
        <img
          src="./House.png"
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="text-center max-w-2xl z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Your Trusted Link to Verified Homes and Land
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Buy, sell, or rent your dream home with ease.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              onClick={() => setPage("listings")}
              icon={Key}
              primary={true}
              className="text-lg py-3 px-8"
            >
              View Houses
            </Button>
            <Button
              onClick={() => setPage("listings")}
              icon={Search}
              primary={false}
              className="text-lg py-3 px-8"
            >
              Start Search
            </Button>
          </div>
        </div>
      </div>

      {/* Featured */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="w-8 h-8 mr-3 text-blue-600" /> Featured
          Properties
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((p) => (
            <FeaturedPropertyCard
              key={p._id}
              property={p}
              navigateToDetails={navigateToDetails}
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-blue-600 text-white p-12 rounded-xl">
        <h3 className="text-3xl font-bold mb-4">Want to Sell or Rent?</h3>
        <p className="text-lg mb-6">
          List your property and reach thousands of buyers today.
        </p>
        <Button
          onClick={() => setPage("register")}
          primary={false}
          className="bg-white text-blue-600 hover:bg-gray-100"
        >
          Register as Lister
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
