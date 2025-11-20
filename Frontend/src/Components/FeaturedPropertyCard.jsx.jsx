import react from 'react';

const FeaturedPropertyCard = ({ property, navigateToDetails }) => {
    // Format price
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'KSH',
        minimumFractionDigits: 0,
    }).format(property.price) + (property.type === 'Rent' ? '/mo' : '');

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] border border-gray-100 cursor-pointer" onClick={() => navigateToDetails(property._id)}>
            <img 
                src={property.image} 
                alt={property.title} 
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x250/6B7280/FFFFFF?text=Featured+Property"; }}
            />
            <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-900 truncate">{property.title}</h4>
                <p className="text-2xl font-bold text-green-600 my-1">{formattedPrice}</p>
                <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {property.location}
                </p>
                <div className="flex justify-start space-x-4 border-t border-gray-100 pt-3 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <Bed className="w-4 h-4 mr-1" /> {property.bedrooms} Beds
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Bath className="w-4 h-4 mr-1" /> {property.bathrooms} Baths
                    </div>
                </div>
                <Button onClick={(e) => { e.stopPropagation(); navigateToDetails(property._id); }} primary={true} className="w-full mt-4">
                    View Details
                </Button>
            </div>
        </div>
    );
};
export default FeaturedPropertyCar;