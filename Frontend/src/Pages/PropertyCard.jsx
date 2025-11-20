const PropertyCard = ({ property, navigateToDetails }) => {
    const { title, listingType, propertyType, price, location, details, images } = property;
    
    // Format price
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price) + (listingType === 'rent' ? '/mo' : '');

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer" onClick={() => navigateToDetails(property._id)}>
            <img 
                src={images[0] || `https://placehold.co/400x250/3B82F6/FFFFFF?text=${propertyType}`} 
                alt={title} 
                className="w-full h-40 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x250/6B7280/FFFFFF?text=No+Image`; }}
            />
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        listingType === 'sale' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                        {listingType.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                        <HomeIcon className="w-3 h-3 mr-1" /> {propertyType.charAt(0).toUpperCase() + propertyType.slice(1)}
                    </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 truncate mb-1">{title}</h3>
                <p className="text-2xl font-bold text-blue-600 my-2">{formattedPrice}</p>
                <p className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" /> {location.city}, {location.country}
                </p>

                <div className="flex justify-around border-t border-gray-100 pt-3 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <Bed className="w-4 h-4 mr-1" /> {details.bedrooms || 'N/A'} Beds
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Bath className="w-4 h-4 mr-1" /> {details.bathrooms || 'N/A'} Baths
                    </div>
                </div>

                <div className="mt-4">
                    <Button onClick={(e) => { e.stopPropagation(); navigateToDetails(property._id); }} primary={true} className="w-full">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

