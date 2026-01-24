import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUmbrellaBeach, FaChevronDown, FaChevronUp, FaCamera, FaMapMarkedAlt, FaImages } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { 
      label: 'Explore', 
      submenu: [
        { path: '/gallery', label: 'Photo Gallery', icon: <FaCamera className="mr-3 text-blue-500" /> },
        { path: '/virtual-tour', label: '360° Virtual Tour', icon: <FaMapMarkedAlt className="mr-3 text-green-500" /> },
        { path: '/rooms', label: 'Rooms & Suites', icon: <FaImages className="mr-3 text-purple-500" /> },
      ]
    },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <FaUmbrellaBeach className="text-blue-600 text-3xl transition-transform group-hover:rotate-12 duration-300" />
            <div>
              <span className="text-2xl font-bold text-gray-800 block">
                Clares Cove
              </span>
              <span className="text-xs text-gray-500 font-medium block">
                Premium Guest House
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.submenu ? (
                <div key={item.label} className="relative group">
                  <button className="flex items-center text-lg text-gray-700 hover:text-blue-600 font-semibold transition-colors">
                    {item.label}
                    <FaChevronDown className="ml-2 text-sm transition-transform group-hover:rotate-180 duration-300" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="flex items-center px-6 py-4 hover:bg-blue-50 transition-all duration-300 first:rounded-t-xl last:rounded-b-xl"
                      >
                        {subItem.icon}
                        <span className="text-gray-700 hover:text-blue-600 font-medium">
                          {subItem.label}
                        </span>
                        {subItem.path === '/virtual-tour' && (
                          <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full">
                            NEW
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-lg text-gray-700 hover:text-blue-600 font-semibold transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
            <Link
              to="/booking"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-xl rounded-b-2xl animate-fade-in-down">
            <div className="flex flex-col space-y-2 py-6 px-4">
              {navItems.map((item) => (
                item.submenu ? (
                  <div key={item.label} className="border-b border-gray-100 last:border-0">
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="flex items-center justify-between w-full text-lg text-gray-700 hover:text-blue-600 px-6 py-4 font-medium rounded-lg"
                    >
                      <span>{item.label}</span>
                      {servicesOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    
                    {servicesOpen && (
                      <div className="ml-6 space-y-2 mt-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="flex items-center text-gray-600 hover:text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                            {subItem.path === '/virtual-tour' && (
                              <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full">
                                NEW
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-6 py-4 font-medium rounded-lg transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <Link
                to="/booking"
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-lg mx-2 text-center text-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-300 mt-4 shadow-lg"
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