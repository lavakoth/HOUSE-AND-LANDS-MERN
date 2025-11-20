const PropertyDetailsPage = ({ propertyId, setPage }) => {
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated } = useAuth();
    
    // Find the property from the mock data
    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const foundProperty = MockProperties.find(p => p._id === propertyId);

            if (foundProperty) {
                // Enhance mock data for details page
                const enhancedProperty = {
                    ...foundProperty,
                    agent: { name: "Jane Doe", phone: "555-0101", email: "jane@realtypro.com" },
                    description: foundProperty.title + " is a stunning property featuring high ceilings, modern finishes, and an excellent location. The " + foundProperty.propertyType + " is meticulously maintained and move-in ready. Enjoy the open floor plan and the convenience of being near all major amenities. This description would typically be much longer.",
                    features: ["Central A/C", "In-unit Washer/Dryer", "Secure Parking", "Pet Friendly (negotiable)", "Community Pool"],
                };
                setProperty(enhancedProperty);
            } else {
                setError('Property not found.');
            }
            setLoading(false);
        };
        
        if (propertyId) {
            fetchDetails();
        }
    }, [propertyId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-60">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-2" />
                <p className="text-lg text-gray-600">Loading property details...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded-xl max-w-lg mx-auto mt-10">
                <p className="font-semibold">Error: {error || 'Property not available.'}</p>
                <Button onClick={() => setPage('listings')} primary={false} className="mt-4">
                    Back to Listings
                </Button>
            </div>
        );
    }
    
    const { title, listingType, propertyType, price, location, details, images, description, features, agent } = property;
    
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price) + (listingType === 'rent' ? '/mo' : '');


    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center pb-4 border-b">
                <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
                <Button onClick={() => setPage('listings')} primary={false}>
                    Back to Search
                </Button>
            </div>
            
            {/* Image and Primary Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <img 
                        src={images[0]} 
                        alt={title} 
                        className="w-full h-96 object-cover rounded-xl shadow-xl border border-gray-100"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1000x600/3B82F6/FFFFFF?text=Property+Photo"; }}
                    />
                    <div className="flex flex-wrap justify-between items-center mt-6 p-4 bg-white rounded-xl shadow-lg border border-blue-50">
                        <div className="text-4xl font-bold text-blue-600">{formattedPrice}</div>
                        <div className="text-lg font-medium text-gray-700 flex items-center">
                            <MapPin className="w-5 h-5 mr-1 text-red-500" /> 
                            {location.city}, {location.country}
                        </div>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                            listingType === 'sale' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}>
                            {listingType.toUpperCase()}
                        </span>
                    </div>
                </div>
                
                {/* Agent Contact Card */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-2xl border border-gray-200 h-fit sticky top-20">
                    <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4 flex items-center">
                        <User className="w-6 h-6 mr-2 text-blue-600"/> Contact Agent
                    </h3>
                    {isAuthenticated ? (
                        <div className="space-y-4">
                            <p className="text-lg font-semibold">{agent.name}</p>
                            <p className="flex items-center text-gray-600"><SquareGanttChart className="w-5 h-5 mr-2 text-blue-400" /> Agent/Lister</p>
                            <a href={`tel:${agent.phone}`} className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                                <Phone className="w-5 h-5 mr-2" /> {agent.phone}
                            </a>
                            <a href={`mailto:${agent.email}`} className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                                <MessageSquare className="w-5 h-5 mr-2" /> {agent.email}
                            </a>
                            <Button primary={true} className="w-full mt-4" icon={MessageSquare}>
                                Send Inquiry Message
                            </Button>
                        </div>
                    ) : (
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-3">Login to view contact details for this property.</p>
                            <Button onClick={() => setPage('login')} primary={true} className="w-full">
                                Log In
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Description and Features */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Key Details */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Key Details</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            <DetailBox icon={Bed} label="Bedrooms" value={details.bedrooms} />
                            <DetailBox icon={Bath} label="Bathrooms" value={details.bathrooms} />
                            <DetailBox icon={SquareGanttChart} label="Size (Sq. Ft.)" value={details.size} />
                            <DetailBox icon={HomeIcon} label="Type" value={propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Property Description</h3>
                        <p className="text-gray-700 leading-relaxed">{description}</p>
                    </div>
                </div>
                
                {/* Features List */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Features & Amenities</h3>
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                                <span className="text-blue-500 mr-3 text-xl">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const DetailBox = ({ icon: Icon, label, value }) => (
    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
        <Icon className="w-6 h-6 mx-auto text-blue-500 mb-1" />
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
    </div>
);
