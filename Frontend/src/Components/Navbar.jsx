
import React from 'react';
import { useState,useAuth } from 'react';


const Header = ({ currentPage, setPage }) => {
  const { user, isAuthenticated, isLister, handleLogout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    setPage(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 
              onClick={() => handleNavClick('home')}
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              RealEstate<span className="text-gray-900">Pro</span>
            </h1>
          </div>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex md:space-x-4">
            {NavLinks.map(link => (
              <a
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`flex items-center px-3 py-2 text-sm font-medium transition duration-150 ease-in-out cursor-pointer rounded-md ${
                  currentPage === link.page
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <link.icon className="w-4 h-4 mr-1" />
                {link.name}
              </a>
            ))}
            
            {/* Conditional Listing Button for Agents/Landlords */}
            {isLister && (
                <Button onClick={() => handleNavClick('createListing')} icon={PlusCircle}>
                    List Property
                </Button>
            )}
          </nav>
          
          {/* Auth/Profile Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative group">
                <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-blue-600">
                    <User className="w-5 h-5"/>
                    <span className="font-medium">{user.username} ({user.role})</span>
                </div>
                {/* Dropdown Menu Simulation */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    <div className="py-1">
                        <a onClick={() => handleNavClick('dashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Dashboard</a>
                        <a onClick={() => { handleLogout(); setPage('home'); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100 cursor-pointer">Logout</a>
                    </div>
                </div>
              </div>
            ) : (
              <>
                <Button onClick={() => handleNavClick('login')} primary={false} icon={LogIn}>Login</Button>
                <Button onClick={() => handleNavClick('register')} primary={true}>Register</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NavLinks.map(link => (
              <a
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                  currentPage === link.page
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </a>
            ))}
            {isAuthenticated ? (
                <>
                    <a onClick={() => handleNavClick('dashboard')} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 cursor-pointer border-t mt-2 pt-2">Dashboard</a>
                    {isLister && (
                        <a onClick={() => handleNavClick('createListing')} className="block px-3 py-2 text-base font-medium text-blue-600 hover:bg-blue-50 cursor-pointer">List Property</a>
                    )}
                    <a onClick={() => { handleLogout(); setPage('home'); }} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-red-50 cursor-pointer">Logout</a>
                </>
            ) : (
                <div className="space-y-2 pt-2 border-t">
                    <Button onClick={() => handleNavClick('login')} primary={false} icon={LogIn}>Login</Button>
                    <Button onClick={() => handleNavClick('register')} primary={true}>Register</Button>
                </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;