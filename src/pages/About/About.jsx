import React, { useState } from 'react';
import { 
  FaUtensils, FaTshirt, FaCar, FaConciergeBell, 
  FaBed, FaTv, FaWifi, FaMoneyBillWave, 
  FaShieldAlt, FaVideo, FaCocktail, FaMoon, 
  FaSwimmingPool, FaBicycle, FaUmbrellaBeach, FaSun,
  FaStar, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaClock, FaUsers, FaAward, FaHeart
} from 'react-icons/fa';
import Footer from '../../common/Footer/Footer.jsx'; // Note: Capital 'F' in Footer


const About = () => {
  const [imageError, setImageError] = useState(false);

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

 return (
  <div className="min-h-screen">
  


      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column - Content */}
            <div className="lg:w-1/2">
              <div className="max-w-2xl">
               
                
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Welcome to <span className="text-blue-600">Clares Cove</span> Guest House
                </h2>
                
                <div className="space-y-4 text-gray-600 text-lg">
                  <p>
                    Nestled in the serene locale of Varca, South Goa, Clares Cove Guest House offers 
                    the perfect blend of traditional Goan hospitality and modern comforts. 
                  </p>
                  <p>
                    Located just 28 km from Goa Dabolim International Airport, 9 km from Madgaon Railway Station, 
                    and 10 km from Margao Bus Terminal, we provide easy access to all major transportation hubs.
                  </p>
                  <p>
                    Our property is designed to offer a relaxed and comfortable stay, complete with a range of 
                    facilities including front desk service, secure parking, and round-the-clock room service.
                  </p>
                  <p>
                    Each spacious guest room is equipped with exquisite furniture, comfortable bedding, television, 
                    telephone, attached bathrooms, and essential toiletries to ensure a memorable stay.
                  </p>
                </div>
                
                
              </div>
            </div>

           {/* Right Column - Images */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    {/* REPLACED Next.js Image with standard img tag */}
                    <img
                      src="/images/about1.jpg"  
                      alt="Clares Cove Guest House Main Building"
                      className="w-full h-64 object-cover transform hover:scale-110 transition-transform duration-700"
                      onError={handleImageError} 
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    {/* REPLACED Next.js Image with standard img tag */}
                    <img
                      src="/images/about2.jpg"  
                      alt="Swimming Pool Area"
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-700"
                      onError={handleImageError} 
                    />
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                 <div className="rounded-2xl overflow-hidden shadow-xl">
                    {/* REPLACED Next.js Image with standard img tag */}
                    <img
                      src="/images/about3.jpg"  
                      alt="Swimming Pool Area"
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-700"
                      onError={handleImageError} 
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    {/* REPLACED Next.js Image with standard img tag */}
                    <img
                      src="/images/about4.jpg"  
                      alt="Swimming Pool Area"
                      className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-700"
                      onError={handleImageError} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16" style={{ backgroundColor: 'hsla(324, 75%, 67%, 0.089)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Premium Amenities & Facilities
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a comfortable and memorable stay
            </p>
          </div>

         
          {/* All Amenities Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {amenitiesCategories.flatMap((category, categoryIndex) =>
    category.items.map((item, itemIndex) => ({
      ...item,
      id: `${categoryIndex}-${itemIndex}`
    }))
  ).map((item) => (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
          style={{
            backgroundColor: `${item.color}20`,
            color: item.color
          }}
        >
          <div className="text-2xl">
            {item.icon}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800">{item.name}</h4>
          {/* Category name removed from here */}
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </section>


      {/* Add Footer here */}
      <Footer />
     
    </div>
  );
};

export default About;