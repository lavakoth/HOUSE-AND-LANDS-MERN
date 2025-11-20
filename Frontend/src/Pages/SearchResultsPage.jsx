import React from "react";
import { useState,useEffect } from "react";

const ListingsPage = ({ navigateToDetails }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter state for SearchResultsPage
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all'); // sale, rent, all

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                // In a real app, you'd add query parameters for filtering here:
                // const url = `${API_BASE_URL}/properties?search=${searchTerm}&type=${filterType}`;
                // const response = await fetch(url);
                // ...
                
                // --- Mocking Data Fetch for Immersive ---
                await new Promise(resolve => setTimeout(resolve, 500)); 
                let data = MockProperties;

                // Apply simple client-side filtering
                if (filterType !== 'all') {
                    data = data.filter(p => p.listingType === filterType);
                }
                if (searchTerm) {
                    const lowerSearch = searchTerm.toLowerCase();
                    data = data.filter(p => 
                        p.title.toLowerCase().includes(lowerSearch) || 
                        p.location.city.toLowerCase().includes(lowerSearch)
                    );
                }
                // --- End Mocking ---
                
                setProperties(data);
            } catch (err) {
                // setError(err.message); // Uncomment for real API errors
                setError('Failed to fetch properties. Using mock data.');
                setProperties(MockProperties);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [filterType, searchTerm]); // Rerun fetch/filter when these change

    if (loading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-2" />
                <p className="text-lg text-gray-600">Loading properties...</p>
            </div>
        );
    }

    if (error) {
        // Display error but proceed if mock data was used
        console.error(error);
    }

    return (
        <div className="p-4 sm:p-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Available Listings ({properties.length})</h2>
            
            {/* Search/Filter Bar (from SearchResultsPage) */}
            <div className="bg-white p-4 mb-8 rounded-lg shadow-xl border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center flex-grow">
                    <Search className="w-5 h-5 text-gray-500 mr-2" />
                    <input 
                        type="text" 
                        placeholder="Search by city, title, or property type..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg w-full sm:w-48"
                >
                    <option value="all">All Types</option>
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                </select>
            </div>

            {properties.length === 0 ? (
                <div className="p-8 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-xl max-w-lg mx-auto mt-10">
                    <p className="font-semibold">No Properties Found matching your criteria.</p>
                    <p className="text-sm">Try adjusting your search filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {properties.map(property => (
                        <PropertyCard key={property._id} property={property} navigateToDetails={navigateToDetails} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default ListingsPage;