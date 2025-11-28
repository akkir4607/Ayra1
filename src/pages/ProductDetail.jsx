import React, { useState, useEffect, useRef, useContext } from 'react';
import { CartContext, WishlistContext } from '../App';
import './ProductDetail.css';

const ProductDetail = ({ product, clickPosition, onClose }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tiltAngle, setTiltAngle] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);
  
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  // Handle Entry Animation on Mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    }, 10);

    return () => {
      document.body.style.overflow = 'unset';
      clearTimeout(timer);
    };
  }, []);

  // Handle 3D Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (imageContainerRef.current && isAnimating) {
        const rect = imageContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        setTiltAngle({
          x: deltaY * 15,
          y: deltaX * 15
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isAnimating]);

  // Internal Close Handler
  const handleCloseInternal = () => {
    setIsAnimating(false);
    setTiltAngle({ x: 0, y: 0 });
    
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      handleCloseInternal();
    }, 1500);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    addToCart(product, selectedSize);
    // Here you can add navigation to checkout page
    handleCloseInternal();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
  };

  if (!product) return null;

  return (
    <div 
      className={`modal-overlay ${isAnimating ? 'active' : ''}`}
      onClick={handleCloseInternal}
    >
      <div 
        className={`modal-container ${isAnimating ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={handleCloseInternal}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-content">
          {/* Left Side - Details */}
          <div className="product-details-section">
            <div className="details-wrapper">
              <h2 className="detail-title">{product.name}</h2>
              <p className="detail-price">{product.price}</p>
              <p className="detail-description">{product.description}</p>
              
              <div className="size-selector">
                <label className="size-label">Select Size</label>
                <div className="size-grid">
                  {product.sizes.map((size) => (
                    <button 
                      key={size} 
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className={`btn-primary ${showSuccess ? 'success' : ''}`}
                  onClick={handleAddToCart}
                  disabled={showSuccess}
                >
                  {showSuccess ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Added to Cart
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                <button className="btn-secondary" onClick={handleBuyNow}>
                  Buy Now
                </button>
                <button 
                  className={`btn-icon ${isInWishlist(product.id) ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                  aria-label="Add to wishlist"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image with Tilt */}
          <div 
            ref={imageContainerRef}
            className="product-image-section"
            style={{
              '--start-x': `${clickPosition?.x || 0}px`,
              '--start-y': `${clickPosition?.y || 0}px`
            }}
          >
            <div 
              className="image-tilt-wrapper"
              style={{
                transform: `perspective(1000px) rotateX(${-tiltAngle.x}deg) rotateY(${tiltAngle.y}deg)`
              }}
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="modal-product-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;