// src/pages/UserDashboardPage.jsx
import React from 'react';
import Button from '../components/Button';
import { PlusCircle, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MockProperties } from '../data/mockData';

const UserDashboardPage = ({ setPage }) => {
  const { user, isLister, handleLogout } = useAuth();
  const myListings = MockProperties.filter(p => Math.random() > 0.5); // mock

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold">Welcome, {user?.firstName || user?.username}!</h2>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center mb-4"><User className="w-8 h-8 mr-3 text-blue-600" /><h3 className="text-xl font-bold">Profile</h3></div>
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <Button onClick={handleLogout} primary={false} className="w-full mt-4 bg-red-100 text-red-600">Logout</Button>
        </div>

        <div className="md:col-span-2">
          {isLister ? (
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">My Listings ({myListings.length})</h3>
                <Button onClick={() => setPage('createListing')} icon={PlusCircle}>New Listing</Button>
              </div>
              {myListings.length === 0 ? <p>No listings yet.</p> : myListings.map(p => (
                <div key={p._id} className="p-4 border-b flex justify-between">
                  <span>{p.title}</span>
                  <span className="text-sm text-gray-500">{p.listingType.toUpperCase()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <p className="text-xl mb-4">Start browsing properties!</p>
              <Button onClick={() => setPage('listings')} primary={true}>View Listings</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;