import React from 'react';
import { Link } from 'react-router-dom';
import { FaUmbrellaBeach } from 'react-icons/fa';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-3 group">
      {/* Logo Icon */}
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-400 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
          <FaUmbrellaBeach className="w-6 h-6 text-white" />
        </div>
        {/* Decorative element */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
      </div>
      
      {/* Logo Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
          Clares Cove
        </span>
        <span className="text-xs text-gray-500">Guest House</span>
      </div>
    </Link>
  );
};

export default Logo;