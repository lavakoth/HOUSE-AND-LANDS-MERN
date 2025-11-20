
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';




const AppContent = () => {
  //currentPage tracks the current view.
  //propertyDetailsId tracks the ID of the property to view, if currentPage is 'details'.
  const [currentPage, setCurrentPage] = useState('home');
  const [propertyDetailsId, setPropertyDetailsId] = useState(null);
  const { user, isLister, isAuthenticated } = useAuth();
  
  // Custom navigation function to handle details page routing
  const navigateToDetails = (id) => {
      setPropertyDetailsId(id);
      setCurrentPage('details');
  };

  // Set the current page to the correct location if a protected route is hit without auth
  const renderPage = () => {
    switch (currentPage) {
      case 'listings':
        // Simulates the SearchResultsPage
        return <ListingsPage navigateToDetails={navigateToDetails} />; 
      case 'details':
        // Simulates the PropertyDetailsPage
        return <PropertyDetailsPage propertyId={propertyDetailsId} setPage={setCurrentPage} />;
      case 'login':
        // Simulates the LoginPage
        return <AuthForm type="login" setPage={setCurrentPage} />;
      case 'register':
        // Simulates the RegisterPage
        return <AuthForm type="register" setPage={setCurrentPage} />;
      case 'dashboard':
        // Simulates the UserDashboard.jsx
        if (!isAuthenticated) return (
             <UnprotectedRouteFallback setPage={setCurrentPage} message="You must be logged in to view your dashboard." />
        );
        return <UserDashboardPage setPage={setCurrentPage} />;
      case 'createListing':
        // Simulates the CreateListingPage (Protected for Lister roles)
        if (!isLister) return (
             <UnprotectedRouteFallback setPage={setCurrentPage} message="You must be logged in as an Agent or Landlord to list a property." />
        );
        return <CreateListingPage setPage={setCurrentPage} />;
      case 'home':
      default:
        // Simulates the HomePage
        return <HomePage setPage={setCurrentPage} navigateToDetails={navigateToDetails} />;
    }
  };
  
  const UnprotectedRouteFallback = ({ setPage, message }) => (
    <div className="max-w-md mx-auto p-6 mt-10 text-center bg-red-50 border border-red-300 rounded-xl shadow-lg">
        <p className="font-semibold text-red-700">Access Denied.</p>
        <p className="text-sm text-red-600 mt-2">{message}</p>
        <Button onClick={() => setPage('login')} primary={true} className="mt-4">Go to Login</Button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

// Main App component wrapping the AuthProvider
const App = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;