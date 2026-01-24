import React, { useState, useEffect, useRef } from 'react';
import Footer from '../../common/Footer/Footer.jsx';

const Gallery = () => {
  /* ================= ROOM DATA WITH CATEGORIES ================= */
  const roomImages = [
    { 
      id: 1, 
      category: 'interior',
      title: 'Modern Living Room',
    },
    { 
      id: 2, 
      category: 'interior',
      title: 'Cozy Bedroom',
    },
    { 
      id: 3, 
      category: 'interior',
      title: 'Minimalist Kitchen',
    },
    { 
      id: 4, 
      category: 'interior',
      title: 'Luxury Bathroom',
    },
    { 
      id: 5, 
      category: 'exterior',
      title: 'Garden View',
    },
    { 
      id: 6, 
      category: 'exterior',
      title: 'Pool Area',
    },
    { 
      id: 7, 
      category: 'exterior',
      title: 'Front Entrance',
    },
    { 
      id: 8, 
      category: 'exterior',
      title: 'Patio Lounge',
    },
    { 
      id: 9, 
      category: 'interior',
      title: 'Home Office',
    }
  ];

  const [imageErrors, setImageErrors] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const modalRef = useRef(null);

  /* ================= IMAGE HANDLERS ================= */
  const handleImageError = (e, id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
    e.target.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
  };

  const handleImageLoad = (id) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const getImageSrc = (id) => {
    if (imageErrors[id]) {
      return "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
    }
    return `/images/room${id}.jpg`;
  };

  /* ================= FILTER FUNCTIONS ================= */
  const getFilteredImages = () => {
    if (activeFilter === 'all') {
      return roomImages;
    }
    return roomImages.filter(room => room.category === activeFilter);
  };

  const getFilterCount = (filterType) => {
    if (filterType === 'all') {
      return roomImages.length;
    }
    return roomImages.filter(room => room.category === filterType).length;
  };

  /* ================= CAROUSEL HANDLERS ================= */
  const handleImageClick = (index) => {
    setCarouselIndex(index);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const goToNextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const filteredImages = getFilteredImages();
    setCarouselIndex((prev) => (prev + 1) % filteredImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const filteredImages = getFilteredImages();
    setCarouselIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCarouselIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Handle touch events for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextSlide();
    }
    
    if (isRightSwipe) {
      goToPrevSlide();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Click outside modal to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === 'Escape') handleCloseModal();
        if (e.key === 'ArrowRight') goToNextSlide();
        if (e.key === 'ArrowLeft') goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, isTransitioning]);

  const filteredImages = getFilteredImages();

 return (
  <div className="min-h-screen bg-white">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:40px_40px] animate-[pulse_20s_ease-in-out_infinite]"></div>
      </div>

      <div className="relative z-10">
       
        {/* Filter Buttons Section */}
        <section className="py-6 md:py-8 bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-30 shadow-sm animate-[slideDown_0.5s_ease-out]">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
                Gallery
              </h1>
            </div>
              
            <p className="text-center text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-6 animate-fadeInUp">
              Explore our collection of beautifully designed spaces
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {['all', 'exterior', 'interior'].map((filter) => (
                <button
                  key={filter}
                  className={`
                    px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 
                    transform hover:scale-105 active:scale-95
                    ${activeFilter === filter
                      ? filter === 'all' 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25'
                        : filter === 'exterior'
                        ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/25'
                        : 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                    }
                  `}
                  onClick={() => {
                    setActiveFilter(filter);
                    document.getElementById('gallery-section')?.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                >
                  <span className="capitalize">{filter}</span>
                  <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs md:text-sm">
                    {getFilterCount(filter)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery-section" className="py-8 md:py-12">
          <div className="container mx-auto px-4">
            {filteredImages.length === 0 ? (
              <div className="text-center py-16 md:py-24 animate-[fadeIn_0.6s_ease-out]">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center animate-[bounce_2s_ease-in-out_infinite]">
                  <span className="text-4xl text-gray-400">📷</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-700 mb-4">No photos found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any photos in the "{activeFilter}" category.
                </p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Show All Photos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-[fadeIn_0.8s_ease-out]">
                {filteredImages.map((room, index) => (
                  <div 
                    key={room.id} 
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-pointer animate-[fadeInUp_0.5s_ease-out]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleImageClick(index)}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-56 sm:h-64 md:h-72 lg:h-80">
                      {/* Loading Skeleton */}
                      {!loadedImages[room.id] && !imageErrors[room.id] && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-[shimmer_2s_infinite]"></div>
                      )}
                      
                      <img
                        src={getImageSrc(room.id)}
                        alt={room.title}
                        className={`
                          w-full h-full object-cover transform transition-all duration-700
                          group-hover:scale-110
                          ${loadedImages[room.id] || imageErrors[room.id] 
                            ? 'opacity-100 scale-100' 
                            : 'opacity-0 scale-95'
                          }
                        `}
                        onLoad={() => handleImageLoad(room.id)}
                        onError={(e) => handleImageError(e, room.id)}
                        loading="lazy"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm
                          ${room.category === 'interior'
                            ? 'bg-purple-600/20 text-purple-700'
                            : 'bg-green-600/20 text-green-700'
                          }
                        `}>
                          {room.category}
                        </span>
                      </div>
                      
                      {/* Hover View Text */}
                      <div className="absolute top-4 right-4 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                          <span className="text-white font-medium">View Details →</span>
                        </div>
                      </div>
                      
                      {/* Title & Description */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                        <h3 className="text-xl font-bold text-white mb-2">{room.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modal for Image Carousel */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
            {/* Animated Backdrop */}
            <div 
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
              onClick={handleCloseModal}
            ></div>
            
            {/* Modal Content */}
            <div 
              ref={modalRef}
              className="relative h-full w-full flex items-center justify-center p-2 sm:p-4 md:p-6"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Close modal"
              >
                <span className="text-xl">✕</span>
              </button>
              
              {/* Navigation Buttons */}
              <button
                onClick={goToPrevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <span className="text-xl">←</span>
              </button>
              
              <button
                onClick={goToNextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 transform hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <span className="text-xl">→</span>
              </button>
              
              {/* Carousel Container */}
              <div className="relative w-full max-w-4xl lg:max-w-6xl">
                {/* Main Image */}
                <div className={`relative ${isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100'} transition-all duration-500`}>
                  <img
                    src={getImageSrc(filteredImages[carouselIndex]?.id)}
                    alt={filteredImages[carouselIndex]?.title}
                    className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-contain rounded-lg shadow-2xl"
                    onError={(e) => handleImageError(e, filteredImages[carouselIndex]?.id)}
                  />
                  
                  {/* Image Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 sm:p-6 rounded-b-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {filteredImages[carouselIndex]?.title}
                        </h3>
                        <div className="flex items-center mt-2">
                          <span className={`
                            px-3 py-1 rounded-full text-xs font-medium mr-3
                            ${filteredImages[carouselIndex]?.category === 'interior'
                              ? 'bg-purple-500/30 text-purple-300'
                              : 'bg-green-500/30 text-green-300'
                            }
                          `}>
                            {filteredImages[carouselIndex]?.category}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <div className="text-white text-lg sm:text-xl font-medium px-4 py-2 bg-black/30 rounded-full">
                          {carouselIndex + 1} / {filteredImages.length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Thumbnails */}
                <div className="flex justify-center mt-4 sm:mt-6 space-x-2 overflow-x-auto py-2">
                  {filteredImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => goToSlide(index)}
                      className={`
                        flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300
                        transform hover:scale-105 active:scale-95
                        ${index === carouselIndex
                          ? 'border-blue-500 scale-110 shadow-lg shadow-blue-500/30'
                          : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-400'
                        }
                      `}
                      aria-label={`Go to image ${index + 1}`}
                    >
                      <img
                        src={getImageSrc(image.id)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Swipe Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/30 px-4 py-2 rounded-full md:hidden">
                ← Swipe to navigate →
              </div>
              
              {/* Keyboard Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm hidden md:block">
                Use ← → arrow keys to navigate • Press ESC to close
              </div>
            </div>
          </div>
        )}
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
        
      
        {/* Add Footer here */}
        <Footer />
      </div>

      {/* Add custom animations to global styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes widthGrow {
          from {
            width: 0;
          }
          to {
            width: 64px;
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Gallery;