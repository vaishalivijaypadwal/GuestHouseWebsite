import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Gallery from './pages/Gallery/Gallery'; // Gallery component
import VirtualTour from './pages/VirtualTour/VirtualTour'; // Virtual Tour component - renamed
import Home from './pages/Home/Home'; // Home component
import Contact from './pages/Contact/Contact'; // Contact component
import About from './pages/About/About'; // About component
import ClaresCoveBookingForm from './components/ClaresCoveBookingForm'; // Corrected import path
import Footer from './common/Footer/Footer'; // Footer component

// Simple Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/virtual-tour', label: '360° Virtual Tour' }, // Changed to URL-friendly path
    { path: '/contact', label: 'Contact' },
    { path: '/booking', label: 'Book Now' }, // Added booking to navigation
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
        <div className="mb-6">
                      <Link to="/" className="inline-flex items-center">
                        {/* Logo Image */}
                        <img 
          src="/images/logo.jpg" 
          alt="Clares Cove Guest House Logo"
          className="h-28 w-auto mr-3 object-contain"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
        
                      </Link>
                    </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="text-gray-600">☰</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="flex flex-col space-y-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-600 hover:text-blue-600 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/virtual-tour" element={<VirtualTour />} /> {/* Added virtual tour route */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<ClaresCoveBookingForm />} /> {/* Added booking route */}
          </Routes>
        </main>
        <Footer /> {/* Added Footer component */}
      </div>
    </Router>
  );
}

export default App;