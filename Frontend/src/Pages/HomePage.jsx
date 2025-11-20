import React from "react";

const HomePage = ({ setPage, navigateToDetails }) => {
    // These match the MockProperties structure but are simplified for the featured section
    const FeaturedProperties = [
        { _id: '1', title: "Sunny Lakeview Condo", price: 320000, type: "Sale", location: "Miami, FL", bedrooms: 2, bathrooms: 2, image: "https://placehold.co/400x250/F8D7DA/000000?text=Featured+Condo" },
        { _id: '2', title: "Spacious Modern Duplex", price: 2100, type: "Rent", location: "Dallas, TX", bedrooms: 3, bathrooms: 2.5, image: "https://placehold.co/400x250/D1E7DD/000000?text=Featured+Duplex" },
        { _id: '3', title: "Luxury Estate with Pool", price: 1500000, type: "Sale", location: "Beverly Hills, CA", bedrooms: 5, bathrooms: 4, image: "https://placehold.co/400x250/CFF4FC/000000?text=Featured+Estate" },
    ];
    
    return (
        <div className="space-y-12">
            
            {/* Hero Section */}
            <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden min-h-[300px] md:min-h-[400px] flex items-center justify-center p-8 border-4 border-blue-100">
                <img 
                    src="https://placehold.co/1200x500/1E3A8A/9CA3AF?text=Find+Your+Next+Home"
                    alt="City skyline or nice house"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1200x500/1E3A8A/9CA3AF"; }}
                />
                <div className="relative text-center max-w-2xl">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 drop-shadow-lg">
                        Discover Your Perfect Property
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 drop-shadow-md">
                        The simplest way to buy, sell, or rent your dream real estate.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button 
                            onClick={() => setPage('listings')} 
                            primary={true} 
                            icon={Key}
                            className="text-lg py-3 px-8 shadow-lg hover:shadow-xl transition transform hover:scale-105"
                        >
                            View All Listings
                        </Button>
                        <Button 
                            onClick={() => setPage('listings')} 
                            primary={false} 
                            icon={Search}
                            className="text-lg py-3 px-8 shadow-lg"
                        >
                            Start Search
                        </Button>
                    </div>
                </div>
            </div>

            {/* Featured Listings Section */}
            <div className="p-4 sm:p-0">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
                    Featured Properties
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FeaturedProperties.map(p => (
                        <FeaturedPropertyCard key={p._id} property={p} navigateToDetails={navigateToDetails} />
                    ))}
                </div>
            </div>
            
            {/* Call to Action for Listing */}
            <div className="p-8 text-center bg-blue-600 rounded-xl shadow-2xl text-white">
                <h3 className="text-3xl font-bold mb-3">Selling or Renting Out a Property?</h3>
                <p className="text-lg mb-6 text-blue-100">Join our network of agents and landlords to list your property today.</p>
                <div className="flex justify-center space-x-4">
                    <Button onClick={() => setPage('register')} primary={false} className="bg-white text-blue-600 hover:bg-gray-100">
                        Register as a Lister
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;