import React from "react";
import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white p-6 mt-12 shadow-inner">
    <div className="max-w-7xl mx-auto text-center">
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} RealtyPlatform. All rights reserved.
      </p>
      <div className="flex justify-center space-x-6 mt-2">
        <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">Privacy</a>
        <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">Terms</a>
        <a href="#" className="text-gray-400 hover:text-blue-400 text-sm">Contact</a>
      </div>
    </div>
  </footer>
    
  )
}

export default Footer;