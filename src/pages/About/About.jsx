import React, { useState, useEffect } from 'react';
import { 
  FaUtensils, FaTshirt, FaCar, FaConciergeBell, 
  FaBed, FaTv, FaWifi, FaMoneyBillWave, 
  FaShieldAlt, FaVideo, FaCocktail, FaMoon, 
  FaSwimmingPool, FaBicycle, FaUmbrellaBeach, FaSun,
  FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaClock, FaUsers, FaAward, FaHeart
} from 'react-icons/fa';
import Footer from '../../common/Footer/Footer.jsx';

const About = () => {
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animatedAmenities, setAnimatedAmenities] = useState([]);

  useEffect(() => {
    setMounted(true);
    
    // Animate amenities one by one
    const amenitiesCount = amenitiesCategories.flatMap(category => category.items).length;
    const timers = [];
    
    for (let i = 0; i < amenitiesCount; i++) {
      timers.push(setTimeout(() => {
        setAnimatedAmenities(prev => [...prev, i]);
      }, 300 + (i * 50)));
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      setMounted(false);
    };
  }, []);

  // Amenities data organized by categories
  const amenitiesCategories = [
    {
      title: "Room Amenities",
      icon: "🏨",
      color: "#3b82f6",
      items: [
        { name: "Refrigerator", icon: <FaUtensils />, color: "#ef4444" },
        { name: "Laundry Service", icon: <FaTshirt />, color: "#8b5cf6" },
        { name: "Room Service", icon: <FaConciergeBell />, color: "#f59e0b" },
        { name: "Free Parking", icon: <FaCar />, color: "#10b981" }
      ]
    },
    {
      title: "Comfort & Entertainment",
      icon: "🛏️",
      color: "#8b5cf6",
      items: [
        { name: "Smart TV", icon: <FaTv />, color: "#ef4444" },
        { name: "Free WiFi", icon: <FaWifi />, color: "#3b82f6" }
      ]
    },
    {
      title: "Payment Options",
      icon: "💳",
      color: "#10b981",
      items: [
        { name: "ATM", icon: <FaMoneyBillWave />, color: "#10b981" },
        { name: "Credit Card Accepted", icon: <FaMoneyBillWave />, color: "#3b82f6" },
        { name: "Online Payment", icon: <FaMoneyBillWave />, color: "#8b5cf6" }
      ]
    },
    {
      title: "Security & Safety",
      icon: "🛡️",
      color: "#f59e0b",
      items: [
        { name: "CCTV", icon: <FaVideo />, color: "#3b82f6" }
      ]
    },
    {
      title: "Entertainment",
      icon: "🎭",
      color: "#8b5cf6",
      items: [
        { name: "Beach Club", icon: <FaCocktail />, color: "#0d9488" },
        { name: "Night Club", icon: <FaMoon />, color: "#374151" },
        { name: "Swimming Pool", icon: <FaSwimmingPool />, color: "#0ea5e9" }
      ]
    },
    {
      title: "Activities",
      icon: "🚴",
      color: "#10b981",
      items: [
        { name: "Cycling", icon: <FaBicycle />, color: "#f97316" },
        { name: "Beach Access", icon: <FaUmbrellaBeach />, color: "#fbbf24" },
      ]
    }
  ];

  // Handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    setImageError(true);
    e.target.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  };

  // Create flat array of amenities for animation
  const flatAmenities = amenitiesCategories.flatMap((category, categoryIndex) =>
    category.items.map((item, itemIndex) => ({
      ...item,
      id: `${categoryIndex}-${itemIndex}`,
      index: categoryIndex * 10 + itemIndex
    }))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out forwards;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1000 { animation-delay: 1000ms; }
        
        .transition-all-300 {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .transition-transform-300 {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .hover-grow:hover {
          transform: scale(1.05);
        }
        
        .hover-shine:hover {
          position: relative;
          overflow: hidden;
        }
        
        .hover-shine:hover::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          transform: rotate(30deg);
          transition: transform 0.6s;
          animation: shine 1.5s;
        }
        
        @keyframes shine {
          from {
            transform: translateX(-100%) rotate(30deg);
          }
          to {
            transform: translateX(100%) rotate(30deg);
          }
        }
      `}</style>

      {/* Introduction Section */}
      <section className="py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column - Content */}
            <div className={`lg:w-1/2 ${mounted ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="max-w-2xl">
                {/* Title with animation */}
                <div className={`mb-6 overflow-hidden ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Welcome to <span className="text-blue-600 relative">
                      Clares Cove
                      <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse-slow"></span>
                    </span> Guest House
                  </h2>
                </div>
                
                {/* Content paragraphs with staggered animation */}
                <div className="space-y-6">
                  {[
                    "Nestled in the serene locale of Varca, South Goa, Clares Cove Guest House offers the perfect blend of traditional Goan hospitality and modern comforts.",
                    "Located just 28 km from Goa Dabolim International Airport, 9 km from Madgaon Railway Station, and 10 km from Margao Bus Terminal, we provide easy access to all major transportation hubs.",
                    "Our property is designed to offer a relaxed and comfortable stay, complete with a range of facilities including front desk service, secure parking, and round-the-clock room service.",
                    
                  ].map((paragraph, index) => (
                    <p 
                      key={index}
                      className={`text-gray-600 text-lg transition-all-300 hover:text-gray-800 p-4 rounded-lg hover:bg-gray-50 ${
                        mounted ? 'animate-fadeInUp' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${300 + (index * 200)}ms` }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className={`lg:w-1/2 ${mounted ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="grid grid-cols-2 gap-4">
                {/* First column of images */}
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all-300 hover-lift group">
                    <div className="relative overflow-hidden">
                      <img
                        src="/images/about1.jpg"  
                        alt="Clares Cove Guest House Main Building"
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all-300"></div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all-300 delay-100">
                        <p className="text-sm font-medium">Main Building</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all-300 hover-lift group delay-200">
                    <div className="relative overflow-hidden">
                      <img
                        src="/images/about2.jpg"  
                        alt="Swimming Pool Area"
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all-300"></div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all-300 delay-100">
                        <p className="text-sm font-medium">Swimming Pool</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Second column of images with offset */}
                <div className="space-y-4 mt-8">
                  <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all-300 hover-lift group delay-300">
                    <div className="relative overflow-hidden">
                      <img
                        src="/images/about3.jpg"  
                        alt="Garden Area"
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all-300"></div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all-300 delay-100">
                        <p className="text-sm font-medium">Garden Area</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all-300 hover-lift group delay-400">
                    <div className="relative overflow-hidden">
                      <img
                        src="/images/about4.jpg"  
                        alt="Room Interior"
                        className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={handleImageError}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all-300"></div>
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-all-300 delay-100">
                        <p className="text-sm font-medium">Room Interior</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 overflow-hidden" style={{ backgroundColor: 'hsla(324, 75%, 67%, 0.089)' }}>
        <div className="container mx-auto px-4">
          {/* Section Header with Animation */}
          <div className={`text-center max-w-3xl mx-auto mb-16 ${mounted ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center animate-float">
                <FaStar className="text-white text-xl" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium <span className="text-blue-600">Amenities</span> & Facilities
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a comfortable and memorable stay
            </p>
            
            {/* Animated underline */}
            <div className="relative mt-6">
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse-slow"></div>
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-50"></div>
            </div>
          </div>

          {/* All Amenities Grid with Staggered Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {flatAmenities.map((item, index) => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all-300 transform hover:-translate-y-2 hover-lift hover-shine ${
                  animatedAmenities.includes(index) ? 'animate-fadeInUp' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  borderLeft: `4px solid ${item.color}`
                }}
              >
                <div className="flex items-center">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 transition-all-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color,
                      boxShadow: `0 4px 20px ${item.color}40`
                    }}
                  >
                    <div className="text-2xl transform group-hover:rotate-12 transition-transform-300">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{item.name}</h4>
                    <div className="w-16 h-1 bg-gradient-to-r from-gray-300 to-transparent rounded-full"></div>
                  </div>
                </div>
                
                {/* Hover effect line */}
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-all-300"></div>
              </div>
            ))}
          </div>

          {/* Animated Stats */}
          <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 ${mounted ? 'animate-fadeInUp delay-1000' : 'opacity-0'}`}>
            {[
              { icon: <FaBed className="text-2xl" />, value: "24", label: "Rooms", color: "blue" },
              { icon: <FaUsers className="text-2xl" />, value: "50+", label: "Happy Guests", color: "purple" },
              { icon: <FaAward className="text-2xl" />, value: "4.8", label: "Rating", color: "green" },
              { icon: <FaClock className="text-2xl" />, value: "24/7", label: "Service", color: "orange" }
            ].map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all-300 hover-lift"
                style={{ animationDelay: `${1100 + (index * 200)}ms` }}
              >
                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all-300 hover:scale-110 hover:rotate-12 ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Elements */}
      {mounted && (
        <>
          {/* Floating decorative elements */}
          <div className="fixed top-20 left-4 w-6 h-6 bg-blue-500/20 rounded-full animate-float" style={{ animationDelay: '500ms' }}></div>
          <div className="fixed top-40 right-8 w-8 h-8 bg-purple-500/20 rounded-full animate-float" style={{ animationDelay: '700ms' }}></div>
          <div className="fixed bottom-40 left-10 w-10 h-10 bg-pink-500/20 rounded-full animate-float" style={{ animationDelay: '900ms' }}></div>
          
          {/* Scroll indicator */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-8 h-12 border-2 border-gray-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-600 rounded-full mt-2 animate-pulse-slow"></div>
            </div>
          </div>
        </>
      )}

{/* Floating Action Buttons */}
      {mounted && (
        <>
         

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/917219236054"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-40 animate-float animate-scaleIn transition-all-300 hover-grow"
            style={{ animationDelay: '900ms' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className="w-14 h-14 drop-shadow-2xl transition-transform-300"
              />
            </div>
          </a>
        </>
      )}
      <Footer />
    </div>
  );
};

export default About;