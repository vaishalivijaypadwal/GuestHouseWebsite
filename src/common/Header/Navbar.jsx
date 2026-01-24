import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  FaHome, 
  FaInfoCircle, 
  FaImages, 
  FaEnvelope,
  FaPhoneAlt,
  FaBed,
  FaSpa,
  FaUtensils,
  FaChevronDown,
  FaCalendarAlt,
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaCamera,
  FaMapMarkedAlt  // Import for the Virtual Tour icon
} from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Navigation links with icons
  const navLinks = [
    { path: '/', label: 'Home', icon: <FaHome className="mr-2" /> },
    { path: '/about', label: 'About Us', icon: <FaInfoCircle className="mr-2" /> },
    { 
      path: null, 
      label: 'Services', 
      icon: <FaChevronDown className="ml-1" />,
      dropdown: [
        { path: '/rooms', label: 'Rooms & Suites', icon: <FaBed className="mr-2" /> },
        { path: '/dining', label: 'Dining', icon: <FaUtensils className="mr-2" /> },
        { path: '/spa', label: 'Spa & Wellness', icon: <FaSpa className="mr-2" /> },
        { path: '/gallery', label: 'Photo Gallery', icon: <FaImages className="mr-2" /> },
        { path: '/virtual-tour', label: '360° Virtual Tour', icon: <FaMapMarkedAlt className="mr-2" /> }, // Added Virtual Tour
      ]
    },
    { path: '/gallery', label: 'Gallery', icon: <FaImages className="mr-2" /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope className="mr-2" /> },
  ];

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active path on location change
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Toggle dropdown
  const toggleDropdown = (label) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <header className={`navbar-container fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'py-2 bg-white/95 backdrop-blur-lg shadow-lg' : 'py-4 bg-gradient-to-b from-black/90 to-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
  <Link to="/" className="flex items-center space-x-3">
    {/* Logo Image */}
    <img 
      src="/images/logo.jpg" 
      alt="Clares Cove Guest House Logo"
      className={`h-10 w-10 md:h-12 md:w-12 object-contain rounded-full border ${isScrolled ? 'border-blue-100' : 'border-white/30'}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.style.display = 'none';
        // Fallback to text if image fails to load
      }}
    />
    <div className="text-3xl font-bold text-white">
      <span className={`${isScrolled ? 'text-blue-600' : 'text-white'}`}>Clares</span>
      <span className="text-blue-400">Cove</span>
    </div>
    <span className={`text-xs ${isScrolled ? 'bg-blue-600 text-white' : 'bg-white/20 text-white'} px-2 py-1 rounded backdrop-blur-sm`}>
      Guest House
    </span>
  </Link>
</div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <li key={index} className="relative group">
                  {link.dropdown ? (
                    // Dropdown menu item
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 font-medium ${isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'}`}
                      >
                        <span>{link.label}</span>
                        <FaChevronDown className={`ml-2 transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform origin-top ${activeDropdown === link.label ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
                        {link.dropdown.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.path}
                            className="flex items-center px-6 py-4 hover:bg-blue-50 transition-all duration-300 group relative"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">
                              {item.icon}
                            </div>
                            <span className="text-gray-700 group-hover:text-blue-600 font-medium">
                              {item.label}
                            </span>
                            
                            {/* Special badge for Virtual Tour */}
                            {item.path === '/virtual-tour' && (
                              <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full animate-pulse">
                                NEW
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // Regular menu item
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) => `
                        flex items-center px-6 py-3 rounded-lg transition-all duration-300 font-medium relative
                        ${isActive 
                          ? `${isScrolled ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/20 text-white backdrop-blur-sm'}`
                          : `${isScrolled ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100' : 'text-white hover:text-blue-300 hover:bg-white/10'}`
                        }
                      `}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                      
                      {/* Active indicator line */}
                      {link.path === activePath && (
                        <span className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-0.5 ${isScrolled ? 'bg-blue-600' : 'bg-white'} rounded-full`}></span>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
              
              {/* Book Now Button */}
              <li className="ml-4">
                <Link
                  to="/booking"
                  className="flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Now
                </Link>
              </li>
              
              {/* WhatsApp Button */}
              <li className="ml-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
                >
                  <FaWhatsapp className="text-xl" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 rounded-lg bg-white/20 backdrop-blur-sm"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-white text-2xl" />
            ) : (
              <FaBars className="text-white text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 transform origin-top ${isMobileMenuOpen ? 'scale-100 opacity-100 mt-4' : 'scale-95 opacity-0 pointer-events-none'}`}>
          <div className="p-4">
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  {link.dropdown ? (
                    <div className="border-b border-gray-100 last:border-0">
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="flex items-center justify-between w-full px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                      >
                        <div className="flex items-center">
                          <span className="font-medium">{link.label}</span>
                        </div>
                        <FaChevronDown className={`transition-transform duration-300 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {/* Mobile Dropdown */}
                      <div className={`overflow-hidden transition-all duration-300 ${activeDropdown === link.label ? 'max-h-96' : 'max-h-0'}`}>
                        {link.dropdown.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            to={item.path}
                            className="flex items-center px-10 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-300 group"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <span className="flex items-center">
                              {item.label}
                              {item.path === '/virtual-tour' && (
                                <span className="ml-2 px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
                                  NEW
                                </span>
                              )}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) => `
                        flex items-center px-6 py-4 rounded-lg transition-all duration-300 border-b border-gray-100 last:border-0
                        ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}
                      `}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                    </NavLink>
                  )}
                </li>
              ))}
              
              {/* Mobile Booking Buttons */}
              <li className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/booking"
                    className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaCalendarAlt className="mr-2" />
                    Book Now
                  </Link>
                  
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    <FaWhatsapp className="mr-2" />
                    WhatsApp
                  </a>
                </div>
              </li>
              
              {/* Contact Info in Mobile Menu */}
              <li className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-3">
                  <FaPhoneAlt className="text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-700">Call us anytime</p>
                    <a href="tel:+919876543210" className="text-blue-600 font-bold">
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  24/7 customer support available
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Scrolled Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-transform duration-300" 
           style={{ transform: `scaleX(${window.scrollY / (document.body.scrollHeight - window.innerHeight)})` }}>
      </div>
    </header>
  );
};

export default Navbar;