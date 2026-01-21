import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaBars, 
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaImages,
  FaEnvelope,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaTwitter
} from 'react-icons/fa';

const MobileMenu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (label) => {
    switch(label) {
      case 'Home': return <FaHome className="mr-3 text-lg" />;
      case 'About Us': return <FaInfoCircle className="mr-3 text-lg" />;
      case 'Gallery': return <FaImages className="mr-3 text-lg" />;
      case 'Contact': return <FaEnvelope className="mr-3 text-lg" />;
      default: return null;
    }
  };

  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6" />
        ) : (
          <FaBars className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          
          {/* Menu Panel */}
          <div 
            className="absolute right-0 top-0 h-full w-80 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">Menu</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-4">
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      end={link.exact}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => `
                        flex items-center px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                        }
                      `}
                    >
                      {getIcon(link.label)}
                      <span className="font-medium">{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact Info */}
            <div className="p-6 border-t">
              <h4 className="font-bold text-gray-800 mb-4">Quick Contact</h4>
              <div className="space-y-3">
                <a 
                  href="tel:+919876543210"
                  className="flex items-center text-gray-600 hover:text-primary-600"
                >
                  <FaPhone className="mr-3" />
                  +91 98765 43210
                </a>
                <div className="flex space-x-4 mt-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-600 hover:text-white transition-colors"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-6 border-t">
              <a
                href="/booking"
                className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center font-semibold py-3 px-6 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;