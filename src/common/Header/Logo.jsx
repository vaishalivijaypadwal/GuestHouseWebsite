{/* Logo */}
<div className="flex items-center">
  <Link to="/" className="flex items-center space-x-3">
    {/* Logo Image with multiple fallbacks */}
    <div className="relative">
      <img 
        src="/images/logo.jpg" 
        alt=""
         className="h-28 w-auto mr-3 object-contain"
        onError={(e) => {
          // Try different image paths if first fails
          if (e.target.src.includes('/images/logo.jpg')) {
            e.target.src = '/logo.jpg';
          } else if (e.target.src.includes('/logo.jpg')) {
            e.target.src = 'https://via.placeholder.com/150x60/3B82F6/FFFFFF?text=Clares+Cove';
          }
        }}
      />
    </div>
    
    {/* Text logo as fallback */}
    
  </Link>
</div>