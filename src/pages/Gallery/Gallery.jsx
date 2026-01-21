import React, { useState, useEffect } from 'react';
import Footer from '../../common/Footer/Footer.jsx'; // Note: Capital 'F' in Footer

const Gallery = () => {
  /* ================= ROOM DATA WITH CATEGORIES ================= */
  const roomImages = [
    { 
      id: 1, 
      category: 'interior'
    },
    { 
      id: 2, 
      category: 'interior'
    },
    { 
      id: 3, 
      category: 'interior'
    },
    { 
      id: 4, 
      category: 'interior'
    },
    { 
      id: 5, 
      category: 'interior'
    },
    { 
      id: 6, 
      category: 'interior'
    },
    { 
      id: 7, 
      category: 'interior'
    },
    { 
      id: 8, 
      category: 'interior'
    },
    { 
      id: 9, 
      category: 'interior'
    }
  ];

  const [imageErrors, setImageErrors] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* ================= IMAGE HANDLERS ================= */
  const handleImageError = (e, id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
    e.target.src = "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";
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

  const filteredImages = getFilteredImages();

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

  return (
  <div className="min-h-screen">
    {/* Gallery Header */}
    <div className="relative pt-10 pb-0">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Gallery
          </h1>
        </div>
    </div>

    {/* Filter Buttons Section */}
    <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4">
        
        
        <div className="flex flex-wrap justify-center gap-3">
          <button
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            All Photos ({getFilterCount('all')})
          </button>

          <button
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'exterior'
                ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('exterior')}
          >
            Exterior ({getFilterCount('exterior')})
          </button>

          <button
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              activeFilter === 'interior'
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setActiveFilter('interior')}
          >
            Interior ({getFilterCount('interior')})
          </button>
        </div>
      </div>
    </section>

    {/* Gallery Section */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        {filteredImages.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-2xl text-gray-400">📷</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-4">No photos found</h3>
            <p className="text-gray-600 mb-8">Try selecting a different filter category</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((room, index) => (
              <div 
                key={room.id} 
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-64 md:h-80">
                  <img
                    src={getImageSrc(room.id)}
                    alt="Gallery"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => handleImageError(e, room.id)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Hover View Text */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                      <span className="text-white text-sm">View</span>
                    </div>
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
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          onClick={handleCloseModal}
        ></div>
        
        {/* Modal Content */}
        <div className="relative h-full w-full flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Close modal"
          >
            ✕
          </button>
          
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Previous image"
          >
            ←
          </button>
          
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            aria-label="Next image"
          >
            →
          </button>
          
          {/* Carousel Container */}
          <div className="relative w-full max-w-6xl">
            {/* Main Image */}
            <div className={`relative ${isTransitioning ? 'opacity-70' : 'opacity-100'} transition-opacity duration-500`}>
              <img
                src={getImageSrc(filteredImages[carouselIndex]?.id)}
                alt="Gallery"
                className="w-full h-[70vh] object-contain rounded-lg shadow-2xl"
                onError={(e) => handleImageError(e, filteredImages[carouselIndex]?.id)}
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div></div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-white text-lg font-medium">
                      {carouselIndex + 1} / {filteredImages.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex justify-center mt-6 space-x-2 overflow-x-auto py-2">
              {filteredImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === carouselIndex
                      ? 'border-blue-500 scale-110'
                      : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
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
          
          {/* Keyboard Instructions */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
            Use ← → arrow keys to navigate • Press ESC to close
          </div>
        </div>
      </div>
    )}

    {/* Add Footer here */}
    <Footer />
  </div>
  );
};

export default Gallery;