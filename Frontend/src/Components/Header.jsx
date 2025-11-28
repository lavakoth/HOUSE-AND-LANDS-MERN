// src/components/Header.jsx
import React, { useState } from "react";
import {
  Home,
  LayoutList,
  PlusCircle,
  LogIn,
  User,
  Menu,
  X,
} from "lucide-react";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";

const Header = ({ currentPage, setPage }) => {
  const { user, isAuthenticated, isLister, handleLogout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", icon: Home, page: "home" },
    { name: "Listings", icon: LayoutList, page: "listings" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            onClick={() => setPage("home")}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            <img src="./logo.png" alt="Homelynk logo"  className=" h-16 w-28;"/>
            
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setPage(item.page)}
                className={`flex items-center gap-2 text-sm font-medium transition ${
                  currentPage === item.page
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}

            {isLister && (
              <Button
                onClick={() => setPage("createListing")}
                icon={PlusCircle}
              >
                List Property
              </Button>
            )}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">{user.username}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setPage("home");
                  }}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => setPage("login")}
                  primary={false}
                  icon={LogIn}
                >
                  Login
                </Button>
                <Button onClick={() => setPage("register")}>Register</Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t pt-4 pb-6">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setPage(item.page);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="inline w-5 h-5 mr-2" />
                {item.name}
              </button>
            ))}

            {isLister && (
              <Button
                onClick={() => {
                  setPage("createListing");
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2"
                icon={PlusCircle}
              >
                List Property
              </Button>
            )}

            <div className="mt-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setPage("dashboard");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setPage("home");
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setPage("login");
                      setMobileMenuOpen(false);
                    }}
                    primary={false}
                    className="w-full"
                    icon={LogIn}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      setPage("register");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
