import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUmbrellaBeach } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Increased height from h-16 to h-20 (5rem) */}
        <div className="flex items-center justify-between h-20">
          {/* Logo with larger text */}
          <Link to="/" className="flex items-center space-x-3">
            <FaUmbrellaBeach className="text-blue-600 text-3xl" /> {/* Increased from text-2xl */}
            <span className="text-2xl font-bold text-gray-800"> {/* Increased from text-xl */}
              Clares Cove
            </span>
          </Link>

          {/* Desktop Navigation with larger text */}
          <nav className="hidden md:flex items-center space-x-10"> {/* Increased spacing */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-lg text-gray-700 hover:text-blue-600 font-semibold transition-colors" // Changed to text-lg
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/booking"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold" // Increased padding and text
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button - larger icon */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />} {/* Increased from 24 to 28 */}
          </button>
        </div>

        {/* Mobile Menu with larger text */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col space-y-5 py-6"> {/* Increased spacing and padding */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-lg text-gray-700 hover:text-blue-600 px-6 py-3 font-medium" // Increased text and padding
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/booking"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg mx-4 text-center text-lg font-semibold" // Increased text and padding
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;