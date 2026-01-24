import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FaArrowRight,
  FaExpand,
  FaTimes,
  FaInstagram,
  FaCamera,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp
} from 'react-icons/fa';
import Footer from '../../common/Footer/Footer.jsx';

const Home = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  
  // About images for carousel with descriptions
  const aboutImages = [
    {
      id: 1,
      title: "Luxury Beachfront Experience",
      description: "Experience the ultimate beachfront luxury with stunning ocean views",
      src: "/images/home1.jpg"
    },
    {
      id: 2,
      title: "Tropical Paradise Awaits",
      description: "Immerse yourself in the tropical beauty of Goa's coastline",
      src: "/images/home2.jpg"
    },
    {
      id: 3,
      title: "Sunset Views",
      description: "Witness breathtaking sunsets over the Arabian Sea",
      src: "/images/home3.jpg"
    },
    {
      id: 4,
      title: "Gourmet Dining",
      description: "Savor authentic Goan cuisine prepared by our master chefs",
      src: "/images/home4.jpg"
    },
    {
      id: 5,
      title: "Luxury Poolside",
      description: "Relax by our Olympic-sized infinity pool with panoramic views",
      src: "/images/home5.jpg"
    },
    {
      id: 6,
      title: "Spa & Wellness",
      description: "Rejuvenate with our traditional Ayurvedic treatments",
      src: "/images/home6.jpg"
    },
    {
      id: 7,
      title: "Cultural Experiences",
      description: "Discover Goa's rich heritage and vibrant culture",
      src: "/images/home7.jpg"
    },
    {
      id: 8,
      title: "Family Friendly",
      description: "Perfect getaway for families with activities for all ages",
      src: "/images/home8.jpg"
    },
    {
      id: 9,
      title: "Romantic Getaways",
      description: "Create unforgettable memories in our romantic suites",
      src: "/images/home9.jpg"
    }
  ];

  // Gallery images
  const galleryImages = [
    { 
      id: 1, 
      
      src: "/images/gallery1.jpg"
    },
    { 
      id: 2, 
     
      src: "/images/gallery2.jpg"
    },
    { 
      id: 3, 
     
      src: "/images/gallery3.jpg"
    },
    { 
      id: 4, 
      
      src: "/images/gallery4.jpg"
    },
    { 
      id: 5, 
     
      src: "/images/gallery5.jpg"
    },
    { 
      id: 6, 
      
      src: "/images/gallery6.jpg"
    },
    { 
      id: 7, 
      
      src: "/images/gallery7.jpg"
    },
    { 
      id: 8, 
     
      src: "/images/gallery8.jpg"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const sectionRefs = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  // Feature highlights
  const features = [
    { icon: <FaBed className="text-4xl" />, title: "Comfortable Rooms", count: "20+ Rooms" },
    { icon: <FaSwimmingPool className="text-4xl" />, title: "Swimming Pool", count: "Olympic Size" },
    { icon: <FaUtensils className="text-4xl" />, title: "Restaurant", count: "Multi-cuisine" },
    { icon: <FaWifi className="text-4xl" />, title: "Free WiFi", count: "High Speed" },
    { icon: <FaCar className="text-4xl" />, title: "Parking", count: "Secure" },
    { icon: <FaUmbrellaBeach className="text-4xl" />, title: "Beach Access", count: "Direct Access" }
  ];

  // Stats data
  const stats = [
    { number: "15+", label: "Years of Excellence" },
    { number: "10k+", label: "Happy Guests" },
    { number: "20+", label: "Premium Rooms" },
    { number: "24/7", label: "Customer Support" }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Priya Sharma",
      text: "Loved the hospitality! Great amenities and super-fast WiFi. Will definitely visit again!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      text: "Perfect location, amazing service. The beachfront view from our room was breathtaking.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      text: "Family-friendly atmosphere with excellent food. Kids loved the pool!",
      rating: 5
    }
  ];

  // Set mounted state on component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

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
  const handleImageLoad = (id, type = 'home') => {
    setIsLoaded(prev => ({ ...prev, [`${type}_${id}`]: true }));
  };

  const handleImageError = (e, id, type = 'home') => {
    e.target.onerror = null;
    setImageErrors(prev => ({ ...prev, [`${type}_${id}`]: true }));
    
    const fallbackImages = {
      home_1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      home_2: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      home_3: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      home_4: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      home_5: 'https://images.unsplash.com/photo-1540202403-a2c2908e9c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      home_6: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      home_7: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      home_8: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_1: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_2: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_4: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_5: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_6: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_7: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      gallery_8: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    };
    
    e.target.src = fallbackImages[`${type}_${id}`] || fallbackImages['gallery_1'];
  };

  // Get image source
  const getImageSrc = (id, type = 'home') => {
    const key = `${type}_${id}`;
    if (imageErrors[key]) {
      const fallbackImages = {
        home_1: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        gallery_1: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        gallery_2: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        gallery_3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        gallery_4: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        gallery_5: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        gallery_6: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      };
      return fallbackImages[key] || fallbackImages['gallery_1'];
    }
    return type === 'home' ? `/images/home${id}.jpg` : `/images/gallery${id}.jpg`;
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

  // Open lightbox
  const openLightbox = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navigate lightbox
  const navigateLightbox = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % galleryImages.length;
    } else {
      newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    }
    
    setSelectedImage(galleryImages[newIndex]);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }, 1500);
  };

  // Navigation functions
  const navigateToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Render star ratings
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="home-page overflow-hidden">
      {/* Hero Carousel */}
      <section className="relative h-[80vh] overflow-hidden pt-16">
        {/* Carousel Slides */}
        {aboutImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === activeIndex 
                ? 'opacity-100 z-10 transform translate-x-0' 
                : 'opacity-0 z-0 transform translate-x-full'
            }`}
            style={{
              transitionDelay: index === activeIndex ? '0ms' : '0ms'
            }}
          >
            <div className="relative w-full h-full">
              <img
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
                  index === activeIndex ? 'scale-100' : 'scale-110'
                }`}
                src={getImageSrc(image.id, 'home')}
                alt={image.title}
                onLoad={() => handleImageLoad(image.id, 'home')}
                onError={(e) => handleImageError(e, image.id, 'home')}
              />
              
              {/* Loading Spinner */}
              {!isLoaded[`home_${image.id}`] && !imageErrors[`home_${image.id}`] && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
              )}

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              
              {/* Carousel Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
                  <div className={`transition-all duration-700 ease-out delay-300 ${
                    index === activeIndex 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-8'
                  }`}>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-extrabold tracking-wide text-white mb-6">
                      CLARES COVE GUEST HOUSE
                    </h2>
                  </div>

                  <div className={`max-w-3xl mx-auto text-white transition-all duration-1000 ease-out delay-500 ${
                    index === activeIndex 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-12'
                  }`}>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-pulse">
                      {image.title}
                    </h3>
                    
                    <p className="text-xl md:text-2xl mb-10 text-gray-200">
                      {image.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                      <button
                        onClick={() => navigateToPage('/rooms')}
                        className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                      >
                        View Rooms
                      </button>
                      <button
                        onClick={() => navigateToPage('/booking')}
                        className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-white/20"
                      >
                        Book Your Stay
                      </button>
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-transparent backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-transparent backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
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
                  ? 'bg-white w-8 animate-pulse'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        data-section="welcome"
        id="welcome"
        className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ease-out ${
            isVisible.welcome 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}>
            {/* Left Column - Content */}
            <div className="lg:w-1/2">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Welcome to <span className="text-blue-600 animate-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] bg-clip-text text-transparent">Clares Cove</span>
                </h2>
                
                <p className="text-xl text-gray-600 mb-6 transition-all duration-700 delay-300">
                  Experience the perfect blend of traditional Goan hospitality and modern luxury 
                  at our beachfront guest house in Goa.
                </p>
                
                <p className="text-xl text-gray-600 mb-10 transition-all duration-700 delay-500">
                  Nestled along the pristine coastline, Clares Cove offers breathtaking ocean views, 
                  spacious accommodations, and authentic cultural experiences that will make your 
                  Goan holiday unforgettable.
                </p>
                
                <div className="flex flex-wrap gap-4 transition-all duration-700 delay-700">
                  <button
                    onClick={() => navigateToPage('/about')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    About Us
                  </button>
                  
                  <button
                    onClick={() => navigateToPage('/contact')}
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="lg:w-1/2">
              <div className={`relative transition-all duration-1000 ease-out delay-300 ${
                isVisible.welcome 
                  ? 'opacity-100 transform translate-x-0' 
                  : 'opacity-0 transform translate-x-12'
              }`}>
                <div className="relative group">
                  <img
                    src="/images/home9.jpg"
                    alt="Clares Cove Guest House"
                    className="w-full h-72 md:h-100 lg:h-[28rem] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
                    }}
                  />
                  
                  {/* Floating Decorative Element */}
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-xl max-w-xs animate-float">
                    <div className="flex items-center">
                      <div className="mr-4 animate-spin-slow">
                        <FaStar className="text-3xl text-yellow-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Premium Service</h4>
                        <p className="text-sm opacity-90">5-Star Rated Hospitality</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Gallery Section */}
<section 
  ref={el => sectionRefs.current[1] = el}
  data-section="gallery"
  id="gallery"
  className="py-16 md:py-24 bg-gradient-to-br from-white via-blue-50/50 to-white overflow-hidden"
>
  <div className="container mx-auto px-4 md:px-8">
    <div className={`text-center max-w-3xl mx-auto mb-12 transition-all duration-1000 ease-out ${
      isVisible.gallery 
        ? 'opacity-100 transform translate-y-0' 
        : 'opacity-0 transform translate-y-8'
    }`}>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
        Gallery 
      </h2>
      <p className="text-xl text-gray-600 mb-8">
        Explore the beauty of Clares Cove through our curated collection
      </p>
    </div>

    {/* Gallery Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {galleryImages.map((image, index) => (
        <div
          key={image.id}
          className={`relative group overflow-hidden rounded-2xl shadow-lg transition-all duration-700 ease-out ${
            isVisible.gallery 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-12'
          }`}
          style={{
            transitionDelay: `${index * 100}ms`,
            height: '300px'
          }}
          onMouseEnter={() => setHoveredImage(image.id)}
          onMouseLeave={() => setHoveredImage(null)}
          onClick={() => openLightbox(image)}
        >
          <div className="relative w-full h-full cursor-pointer">
            {/* Loading Placeholder */}
            {!isLoaded[`gallery_${image.id}`] && !imageErrors[`gallery_${image.id}`] && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500 border-solid"></div>
              </div>
            )}

            {/* Image */}
            <img
              src={getImageSrc(image.id, 'gallery')}
              alt={image.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                hoveredImage === image.id ? 'scale-110' : 'scale-100'
              } ${isLoaded[`gallery_${image.id}`] ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => handleImageLoad(image.id, 'gallery')}
              onError={(e) => handleImageError(e, image.id, 'gallery')}
            />

            {/* Overlay with centered text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-2xl font-bold mb-2 text-center">{image.title}</h3>
                <p className="text-gray-200 text-sm text-center max-w-xs">{image.description}</p>
                <div className="mt-4">
                  <FaExpand className="text-white text-2xl" />
                </div>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
        </div>
      ))}
    </div>
    
  </div>
</section>

      {/* Features Section */}
      <section 
        ref={el => sectionRefs.current[2] = el}
        data-section="features"
        id="features"
        className="py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: 'hsla(324, 75%, 67%, 0.089)' }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ease-out ${
            isVisible.features 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Amenities
            </h2>
            <p className="text-xl text-gray-600">
              Enjoy world-class amenities designed for your comfort and convenience
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center transition-all duration-500 ease-out ${
                  isVisible.features 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-12'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="flex justify-center mb-4 group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                      {feature.icon}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
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

      
      {/* Contact Section */}
<section 
  ref={el => sectionRefs.current[4] = el}
  data-section="contact"
  id="contact"
  className="py-16 md:py-24 bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden relative"
>
  {/* Animated background elements */}
  <div className="absolute top-10 left-10 w-64 h-64 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
  <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
  <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-cyan-700 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
  
  <div className="container mx-auto px-4 md:px-8 relative z-10">
    <div className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
      isVisible.contact 
        ? 'opacity-100 transform translate-y-0' 
        : 'opacity-0 transform translate-y-12'
    }`}>
      {/* Left Column - Contact Info */}
      <div className={`space-y-8 transition-all duration-700 ease-out ${
        isVisible.contact 
          ? 'opacity-100 transform translate-x-0' 
          : 'opacity-0 transform -translate-x-8'
      }`}>
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-gradient bg-gradient-to-r from-white via-orange-300 to-white bg-[length:200%_auto] bg-clip-text text-transparent">
            Get In Touch With Us Anytime!
          </h2>
          <p className="text-blue-100 mb-8 text-lg leading-relaxed animate-fadeInUp">
            Have questions or need assistance? We're here to help! Contact Clares Cove for bookings, 
            inquiries, or special requests. Your comfort is our priority.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Phone */}
          <div className={`flex items-start transform transition-all duration-500 hover:translate-x-2 group ${
            isVisible.contact ? 'animate-fadeInLeft' : 'opacity-0'
          }`} style={{ animationDelay: '200ms' }}>
            <div className="bg-blue-800 p-4 rounded-xl mr-4 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
              <FaPhone className="text-white text-xl" />
            </div>
            <div>
              <p className="font-semibold text-lg mb-1">Phone Numbers</p>
              <a href="tel:+918390337474" className="text-blue-200 hover:text-white transition-colors duration-300 block hover:translate-x-2">
                 +91 8390337474
              </a>
              <a href="tel:+917299931212" className="text-blue-200 hover:text-white transition-colors duration-300 block hover:translate-x-2">
                 +91 7299931212
              </a>
            </div>
          </div>
          
          {/* Email */}
          <div className={`flex items-start transform transition-all duration-500 hover:translate-x-2 group ${
            isVisible.contact ? 'animate-fadeInLeft' : 'opacity-0'
          }`} style={{ animationDelay: '400ms' }}>
            <div className="bg-blue-800 p-4 rounded-xl mr-4 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
              <FaEnvelope className="text-white text-xl" />
            </div>
            <div>
              <p className="font-semibold text-lg mb-1">Email Address</p>
             
              <a href="mailto:bookings@clarescove.com" className="text-blue-200 hover:text-white transition-colors duration-300 block hover:translate-x-2">
                 bookings@clarescove.com
              </a>
            </div>
          </div>
          
          {/* Location */}
          <div className={`flex items-start transform transition-all duration-500 hover:translate-x-2 group ${
            isVisible.contact ? 'animate-fadeInLeft' : 'opacity-0'
          }`} style={{ animationDelay: '600ms' }}>
            <div className="bg-blue-800 p-4 rounded-xl mr-4 group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
              <FaMapMarkerAlt className="text-white text-xl" />
            </div>
            <div>
              <p className="font-semibold text-lg mb-1">Location</p>
              <p className="text-blue-200 hover:text-white transition-colors duration-300 block hover:translate-x-2">
                 Holiday St, Gauravaddo, Calangute
              </p>
              <p className="text-blue-200 hover:text-white transition-colors duration-300 block hover:translate-x-2">
                 Goa, India 403516
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
       
      </div>

      {/* Right Column - Contact Form */}
      <div className={`bg-white rounded-2xl p-8 text-gray-800 shadow-2xl transform transition-all duration-1000 ease-out hover:shadow-3xl ${
        isVisible.contact 
          ? 'opacity-100 translate-x-0 scale-100 animate-fadeInRight' 
          : 'opacity-0 translate-x-8 scale-95'
      }`}>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Send us a Message</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6 transform transition-all duration-300 hover:scale-[1.02] animate-fadeInUp" style={{ animationDelay: '100ms' }}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              required
            />
          </div>
          
          <div className="mb-6 transform transition-all duration-300 hover:scale-[1.02] animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md"
              required
            />
          </div>
          
          <div className="mb-6 transform transition-all duration-300 hover:scale-[1.02] animate-fadeInUp" style={{ animationDelay: '300ms' }}>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md resize-none"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={formStatus === 'sending'}
            className={`group w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 animate-fadeInUp ${
              formStatus === 'sending'
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl'
            }`}
            style={{ animationDelay: '400ms' }}
          >
            <span className="relative z-10">
              {formStatus === 'sending' ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                  Sending...
                </span>
              ) : (
                <>
                  Send Message
                  <FaArrowRight className="inline-block ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </button>
          
          {formStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg text-center animate-bounce">
              ✅ Message sent successfully! We'll get back to you within 24 hours.
            </div>
          )}
        </form>
      </div>
    </div>
  </div>
</section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-gray-50 to-gray-100 py-20 text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Book Your Stay Today!
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700 mb-8 text-xl">
            Discover the best corporate guest house in Goa with unmatched hospitality, modern amenities, and budget-friendly pricing. Whether you’re planning a business trip, a weekend getaway, or a long-term stay, Clares Cove Guest House is your ideal accommodation choice.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center mb-8">
            <div className="flex items-center">
              <FaPhone className="text-blue-600 mr-2" />
              <span className="font-semibold">Call Now: +91 8390337474</span>
            </div>
            <div className="flex items-center">
              <FaWhatsapp className="text-green-600 mr-2" />
              <span className="font-semibold">WhatsApp: +91 7219236054</span>
            </div>
          </div>
          
          <button
            onClick={() => navigateToPage('/booking')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 transition-colors duration-300 z-10 bg-black/30 p-3 rounded-full"
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>
          
          <button
            onClick={() => navigateLightbox('prev')}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors duration-300 z-10 bg-black/30 p-4 rounded-full hover:scale-110 transition-transform"
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          
          <button
            onClick={() => navigateLightbox('next')}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors duration-300 z-10 bg-black/30 p-4 rounded-full hover:scale-110 transition-transform"
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>
          
          <div className="relative max-w-6xl max-h-[90vh] mx-4 animate-scaleIn">
            <img
              src={getImageSrc(selectedImage.id, 'gallery')}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h3 className="text-3xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300">{selectedImage.description}</p>
              <div className="mt-2 text-gray-400">Gallery #{selectedImage.id.toString().padStart(2, '0')}</div>
            </div>
            
            <div className="absolute top-4 left-4 flex items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              <FaCamera className="mr-2" />
              Photo
            </div>
          </div>
          
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm text-center bg-black/30 px-4 py-2 rounded-full">
            Use arrow keys or click to navigate • Press ESC to close
          </div>
        </div>
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
                className="w-14 h-14 drop-shadow-2xl transition-transform duration-300 hover:scale-110"
              />
            </div>
          </a>
        </>
      )}

      {/* Footer */}
      <Footer />

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        
        /* Custom utility classes */
        .transition-all-300 {
          transition: all 0.3s ease;
        }
        
        .hover-grow:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Home;