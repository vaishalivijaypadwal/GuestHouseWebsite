import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Company Logo & Info */}
          <div>
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center">
                {/* Logo Image */}
                <img 
  src="/images/logo.jpg" 
  alt="Clares Cove Guest House Logo"
  className="h-16 w-30 mr-3 object-contain rounded-md border border-gray-300"
  onError={(e) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
  }}
/>


               
              </Link>
            </div>
            
            <p className="text-gray-300 mb-6">
              Experience the perfect blend of traditional Goan hospitality and modern luxury 
              at our beachfront guest house in Goa.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mb-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Facebook"
              >
                <FaFacebook className="text-white" />
              </a>
              <a 
                href="https://instagram.com/clarescove_goa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="text-white" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-white" />
              </a>
            </div>
            
            {/* Opening Hours */}
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h4 className="font-bold text-white mb-1">Opening Hours</h4>
              <p className="text-gray-300 text-sm">24/7 Reception</p>
              <p className="text-gray-300 text-sm">Check-in: 11:00 AM</p>
              <p className="text-gray-300 text-sm">Check-out: 10:00 PM</p>
            </div>
          </div>

          {/* Column 2: Quick Links & Navigation */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Quick Links</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block">
                      Gallery
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/virtual-tour" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block">
                      360° Virtual Tour
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/booking" className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 block">
                      Book Now
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Details</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Our Location</h4>
                  <p className="text-gray-300 text-sm">
                    Holiday St, Gauravaddo, Calangute,<br />
                    Goa 403516, India
                  </p>
                  <a 
                    href="https://maps.google.com/?q=Clares+Cove+Guest+House+Goa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm mt-1 inline-block transition-colors"
                  >
                    View on Google Maps →
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-green-600 p-3 rounded-full">
                  <FaPhoneAlt className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Phone Numbers</h4>
                  <div className="space-y-1">
                    <a href="tel:+918999358172" className="text-gray-300 hover:text-white text-sm block transition-colors">
                      +91 89993 58172
                    </a>
                    <a href="tel:+917249171196" className="text-gray-300 hover:text-white text-sm block transition-colors">
                      +91 72491 71196
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-red-600 p-3 rounded-full">
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Email Address</h4>
                  <a href="mailto:clarescovegoa@gmail.com" className="text-gray-300 hover:text-white text-sm block transition-colors">
                    clarescovegoa@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400">
              © {currentYear} Clares Cove Guest House. All rights reserved.
            </p>
          </div>
          
          {/* Made with love */}
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-gray-400 mr-2">Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span className="text-gray-400 ml-2">in Goa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;