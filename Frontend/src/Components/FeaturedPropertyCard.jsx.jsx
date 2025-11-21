// src/components/FeaturedPropertyCard.jsx
import React from 'react';
import { Bed, Bath, MapPin } from 'lucide-react';
import Button from './components/Button';

const FeaturedPropertyCard = ({ property, navigateToDetails }) => {
  const { title, price, type, location, bedrooms, bathrooms, image } = property;

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 3
  }).format(price) + (type === 'Rent' ? '/mo' : '');

  return (
    <div 
      onClick={() => navigateToDetails(property._id)}
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <h4 className="text-xl font-bold text-gray-900 truncate">{title}</h4>
        <p className="text-2xl font-bold text-green-600 my-2">{formattedPrice}</p>
        <p className="text-sm text-gray-600 flex items-center">
          <MapPin className="w-4 h-4 mr-1" /> {location}
        </p>
        <div className="flex gap-6 mt-4 text-sm text-gray-600">
          <span className="flex items-center"><Bed className="w-4 h-4 mr-1" /> {bedrooms} Beds</span>
          <span className="flex items-center"><Bath className="w-4 h-4 mr-1" /> {bathrooms} Baths</span>
        </div>
        <Button 
          onClick={(e) => { e.stopPropagation(); navigateToDetails(property._id); }}
          primary={true}
          className="w-full mt-5"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;