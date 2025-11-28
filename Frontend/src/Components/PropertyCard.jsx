// src/components/PropertyCard.jsx
import React from "react";
import { Bed, Bath, MapPin, Home as HomeIcon } from "lucide-react";
import Button from "./Button";

const PropertyCard = ({ property, navigateToDetails }) => {
  const { title, price, listingType, propertyType, location, details, images } =
    property;

  const formattedPrice =
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 3,
    }).format(price) + (listingType === "rent" ? "/mo" : "");

  return (
    <div
      onClick={() => navigateToDetails(property._id)}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border"
    >
      <img
        src={
          images[0] ||
          "./House.png"
        }
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span
            className={`text-xs font-bold px-2 py-1 rounded-full ${
              listingType === "sale"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {listingType.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500 flex items-center">
            <HomeIcon className="w-4 h-4 mr-1" />
            {propertyType}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {title}
        </h3>
        <p className="text-2xl font-bold text-blue-600 my-2">
          {formattedPrice}
        </p>
        <p className="text-sm text-gray-600 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {location.city}, {location.country}
        </p>

        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <div className="flex items-center text-sm text-gray-600">
            <Bed className="w-4 h-4 mr-1" /> {details.bedrooms}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Bath className="w-4 h-4 mr-1" /> {details.bathrooms}
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            navigateToDetails(property._id);
          }}
          primary={true}
          className="w-full mt-4"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default PropertyCard;
