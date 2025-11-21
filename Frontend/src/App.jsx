// src/App.jsx
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Pages
import HomePage from './Pages/HomePage';
import ListingsPage from './Pages/ListingsPage';
import PropertyDetailsPage from './Pages/PropertyDetailsPage';
import AuthForm from './Pages/AuthForm';
import UserDashboardPage from './Pages/UserDashboardPage';
import CreateListingPage from './Pages/CreateListingPage';

const AppContent = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [propertyId, setPropertyId] = useState(null);
  const { isAuthenticated, isLister } = useAuth();

  const goToDetails = (id) => {
    setPropertyId(id);
    setCurrentPage('details');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':      return <HomePage setPage={setCurrentPage} navigateToDetails={goToDetails} />;
      case 'listings':  return <ListingsPage navigateToDetails={goToDetails} />;
      case 'details':   return <PropertyDetailsPage propertyId={propertyId} setPage={setCurrentPage} />;
      case 'login':     return <AuthForm type="login" setPage={setCurrentPage} />;
      case 'register':  return <AuthForm type="register" setPage={setCurrentPage} />;
      case 'dashboard':
        return isAuthenticated ? <UserDashboardPage setPage={setCurrentPage} /> 
                               : <div className="text-center py-20 text-red-600 text-2xl">Please login first</div>;
      case 'createListing':
        return isLister ? <CreateListingPage setPage={setCurrentPage} />
                        : <div className="text-center py-20 text-red-600 text-2xl">Only agents/landlords can list</div>;
      default:          return <HomePage setPage={setCurrentPage} navigateToDetails={goToDetails} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;