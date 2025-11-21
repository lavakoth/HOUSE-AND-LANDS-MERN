// src/pages/ListingsPage.jsx
import React, { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { MockProperties } from '../data/mockData';

const ListingsPage = ({ navigateToDetails }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      let filtered = MockProperties;

      if (filterType !== 'all') {
        filtered = filtered.filter(p => p.listingType === filterType);
      }
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(term) ||
          p.location.city.toLowerCase().includes(term)
        );
      }

      setProperties(filtered);
      setLoading(false);
    }, 500);
  }, [searchTerm, filterType]);

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Available Listings ({properties.length})</h2>

      <div className="bg-white p-4 rounded-lg shadow mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex flex-1 items-center border rounded-lg px-3">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search city, title..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full py-3 outline-none"
          />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-4 py-3 border rounded-lg">
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No properties match your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {properties.map(p => (
            <PropertyCard key={p._id} property={p} navigateToDetails={navigateToDetails} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;