import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaLinkedinIn
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-300 text-sm">
                    Holiday St, Gauravaddo, Calangute, Goa 403516
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+919876543210" className="text-gray-300 hover:text-white text-sm transition-colors">
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:ClaresCoveGuestHouse@gmail.com" className="text-gray-300 hover:text-white text-sm transition-colors">
                    ClaresCoveGuestHouse@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-white transition-colors block">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors block">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-white transition-colors block">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Developed by</h3>
            <div className="space-y-4">
              <p className="text-gray-300">
                KA IT Solutions
              </p>
              
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            © {currentYear} Clares Cove Guest House. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Designed and developed with  by KA IT Solutions
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;