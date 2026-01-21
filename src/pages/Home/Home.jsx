import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBed, 
  FaSwimmingPool, 
  FaUtensils, 
  FaWifi, 
  FaCar, 
  FaUmbrellaBeach, 
  FaSpa, 
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight
} from 'react-icons/fa';
import Footer from '../../common/Footer/Footer.jsx'; // Note: Capital 'F' in Footer
const Home = () => {
  // About images for carousel
  const aboutImages = [
    {
      id: 1,
      
    },
    {
      id: 2,
     
    },
   
    {
      id: 4,
      
    },
    {
      id: 5,
     
    },
    
    {
      id: 7,
      
    },
    {
      id: 8,
      
    },
    {
      id: 9,
      
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Feature highlights
  const features = [
    { icon: <FaBed className="text-4xl" />, title: "Comfortable Rooms", count: "20+ Rooms" },
    { icon: <FaSwimmingPool className="text-4xl" />, title: "Swimming Pool", count: "Olympic Size" },
    { icon: <FaUtensils className="text-4xl" />, title: "Restaurant", count: "Multi-cuisine" },
    { icon: <FaWifi className="text-4xl" />, title: "Free WiFi", count: "High Speed" },
    { icon: <FaCar className="text-4xl" />, title: "Parking", count: "Secure" },
    { icon: <FaUmbrellaBeach className="text-4xl" />, title: "Beach Access", count: "Direct Access" }
  ];

  // Auto-play carousel
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => 
          prevIndex === aboutImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, aboutImages.length]);

  // Handle image loading
  const handleImageLoad = (id) => {
    setIsLoaded(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (e, id) => {
    e.target.onerror = null;
    setImageErrors(prev => ({ ...prev, [id]: true }));
    
    const fallbackImages = {
      1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      2: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      3: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      4: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      5: 'https://images.unsplash.com/photo-1540202403-a2c2908e9c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      6: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      7: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      8: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    };
    
    e.target.src = fallbackImages[id] || fallbackImages[1];
  };

  // Get image source
  const getImageSrc = (id) => {
    if (imageErrors[id]) {
      const fallbackImages = {
        1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        2: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        3: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        4: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        5: 'https://images.unsplash.com/photo-1540202403-a2c2908e9c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        6: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        7: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      };
      return fallbackImages[id] || fallbackImages[1];
    }
    return `/images/home${id}.jpg`;
  };

  // Carousel navigation
  const goToPrevSlide = () => {
    setActiveIndex(prev => prev === 0 ? aboutImages.length - 1 : prev - 1);
    setIsAutoPlaying(false);
  };

  const goToNextSlide = () => {
    setActiveIndex(prev => prev === aboutImages.length - 1 ? 0 : prev + 1);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="relative h-[80vh] overflow-hidden pt-16">
        {/* Carousel Slides */}
        {aboutImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div className="relative w-full h-full">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={getImageSrc(image.id)}
                alt={image.title}
                onLoad={() => handleImageLoad(image.id)}
                onError={(e) => handleImageError(e, image.id)}
              />
              
              {/* Loading Spinner */}
              {!isLoaded[image.id] && !imageErrors[image.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
              )}


              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              
              
              {/* Carousel Content */}
<div className="absolute inset-0 flex items-center justify-center">
  <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-extrabold tracking-wide text-white mb-6">
      CLARES COVE GUEST HOUSE
    </h2>

    <div className="max-w-3xl mx-auto text-white">
      <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
        {image.title}
      </h3>
      
      <p className="text-xl md:text-2xl mb-10 text-gray-200">
        {image.description}
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
       
        
        <Link
          to="/booking"
          className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
        >
          Book Your Stay
        </Link>
      </div>
    </div>
  </div>
</div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
  onClick={goToPrevSlide}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-transparent backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
  aria-label="Previous slide"
>
  <FaChevronLeft className="text-xl" />
</button>

<button
  onClick={goToNextSlide}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-transparent backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300"
  aria-label="Next slide"
>
  <FaChevronRight className="text-xl" />
</button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {aboutImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column - Content */}
            <div className="lg:w-1/2">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Welcome to <span className="text-blue-600">Clares Cove</span>
                </h2>
                
                <p className="text-xl text-gray-600 mb-6">
                  Experience the perfect blend of traditional Goan hospitality and modern luxury 
                  at our beachfront guest house in Goa.
                </p>
                
                <p className="text-xl text-gray-600 mb-10">
                  Nestled along the pristine coastline, Clares Cove offers breathtaking ocean views, 
                  spacious accommodations, and authentic cultural experiences that will make your 
                  Goan holiday unforgettable.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/about"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                  >
                    About Us
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:w-1/2">
  <div className="relative">
   <img
  src="/images/home9.jpg"
  alt="Clares Cove Guest House"
  className="w-full h-72 md:h-100 lg:h-[28rem] object-cover rounded-2xl shadow-2xl"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  }}
/>
    
    {/* Decorative Element */}
    <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-xl max-w-xs">
      <div className="flex items-center">
        <div className="mr-4">
          <FaStar className="text-3xl text-yellow-400" />
        </div>
        <div>
          <h4 className="font-bold text-lg">Premium Service</h4>
          <p className="text-sm opacity-90">5-Star Rated Hospitality</p>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24" style={{ backgroundColor: 'hsla(324, 75%, 67%, 0.089)' }}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Facilities & Amenities
            </h2>
            <p className="text-xl text-gray-600">
              Enjoy world-class amenities designed for your comfort and convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600">
                  {feature.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Column - Images */}
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                {aboutImages.slice(0, 4).map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="overflow-hidden rounded-xl">
                      <img
                        src={getImageSrc(image.id)}
                        alt={image.title}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => handleImageError(e, image.id)}
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white font-medium text-sm">
                        {image.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:w-1/2">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Discover Our Story
                </h2>
                
                <p className="text-xl text-gray-600 mb-8">
                  Clares Cove Guest House has been welcoming travelers since 2010, 
                  offering authentic Goan experiences with modern comforts.
                </p>
                
                <div className="mb-10">
                  <h5 className="text-2xl font-semibold text-gray-900 mb-4">
                    What Makes Us Special:
                  </h5>
                  
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FaStar className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Beachfront location with private access</span>
                    </li>
                    
                    <li className="flex items-start">
                      <FaStar className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Authentic Goan architecture and decor</span>
                    </li>
                    
                    <li className="flex items-start">
                      <FaStar className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Family-run with personalized service</span>
                    </li>
                    
                    <li className="flex items-start">
                      <FaStar className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">Sustainable tourism practices</span>
                    </li>
                  </ul>
                </div>
                
                <Link
                  to="/about"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 group"
                >
                  <FaSpa className="mr-3" />
                  Explore More About Us
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Add Footer here */}
            <Footer />
    </div>
  );
};

export default Home;