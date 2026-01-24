import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center group">
      {/* Logo Image */}
      <div className="relative">
        <img 
          src="/images/logo.jpg" 
          alt="Clares Cove Guest House"
          className="w-14 h-14 rounded-lg object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            // Add a fallback text
            const parent = e.target.parentNode;
            const fallback = document.createElement('div');
            fallback.className = 'w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center text-white font-bold text-lg';
            fallback.textContent = 'CC';
            parent.replaceChild(fallback, e.target);
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;