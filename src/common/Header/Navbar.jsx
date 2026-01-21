import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaInfoCircle, 
  FaImages, 
  FaEnvelope,
  FaChevronDown
} from 'react-icons/fa';

const Navbar = ({ links }) => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);

  // Get icon for each link
  const getIcon = (label) => {
    switch(label) {
      case 'Home': return <FaHome className="mr-2" />;
      case 'About Us': return <FaInfoCircle className="mr-2" />;
      case 'Gallery': return <FaImages className="mr-2" />;
      case 'Contact': return <FaEnvelope className="mr-2" />;
      default: return null;
    }
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active path on location change
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <nav className="relative">
      <ul className="flex items-center space-x-1">
        {links.map((link, index) => (
          <li key={index} className="relative group">
            <NavLink
              to={link.path}
              end={link.exact}
              className={({ isActive }) => `
                flex items-center px-4 py-2 rounded-lg transition-all duration-300
                ${isActive 
                  ? 'bg-primary-600 text-white shadow-lg transform -translate-y-0.5' 
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100'
                }
                ${isScrolled ? 'text-sm' : 'text-base'}
              `}
            >
              {getIcon(link.label)}
              <span className="font-medium">{link.label}</span>
              
              {/* Active indicator */}
              {link.path === activePath && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-600 rounded-full"></span>
              )}
            </NavLink>

            {/* Hover effect line */}
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;