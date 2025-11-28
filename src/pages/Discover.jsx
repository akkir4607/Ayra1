// Discover.jsx
import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../App';
import './Discover.css';
import ProductDetail from './ProductDetail';
import image6 from '../images/121.jpg';
import image7 from '../images/120.jpg';
import image5 from '../images/122.jpg';
import image8 from '../images/123.png';
import image9 from '../images/124.jpg';
import image10 from '../images/125.jpg';
import image13 from '../images/128.jpg';
import image12 from '../images/127.jpg';
import image14 from '../images/129.jpg';
import image15 from '../images/130.jpg';
import image16 from '../images/5.jpg';
// --- New Images for bottom section (Replace with your own lifestyle shots) ---
import editImage1 from '../images/121.jpg'; // Reusing image6
import editImage2 from '../images/131.jpg'; // Reusing image9
import editImage3 from '../images/132.jpg';   // Reusing image16


// ProductCard Component with enhanced animations
const ProductCard = ({ product, onProductClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  
  const inWishlist = isInWishlist(product.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
    onProductClick(product, clickPosition);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      ref={cardRef}
      className={`product-card ${isVisible ? 'visible' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper" onClick={handleClick}>
        <div className="image-overlay"></div>
        <img
          src={product.image}
          alt={product.name}
          className={`product-img ${isHovered ? 'hovered' : ''}`}
        />
        <button className="quick-add-btn">
          <span className="plus-icon">+</span>
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">{product.price}</p>
      </div>

      <button 
        className={`wishlist-icon ${inWishlist ? 'active' : ''}`}
        onClick={handleWishlistClick}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={inWishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
};

// Product data
const products = [
  { id: 1, name: 'FLORAL SUMMER TOP', price: '₹ 1,200.00', image: image5, description: 'Lightweight floral printed top perfect for summer days. Breathable fabric with a relaxed fit for ultimate comfort.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 2, name: 'DENIM HIGH WAIST SHORTS', price: '₹ 1,800.00', image: image8, description: 'Classic high-waist denim shorts with a comfortable fit. Distressed details for a casual, edgy look.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 3, name: 'OFF SHOULDER BLOUSE', price: '₹ 1,500.00', image: image9, description: 'Elegant off-shoulder blouse in soft chiffon. Ideal for romantic evenings or casual outings.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 4, name: 'MIDI SKIRT', price: '₹ 2,200.00', image: image10, description: 'Flowing midi skirt with subtle pleats. Versatile piece that pairs well with tops and blouses.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 5, name: 'CROP TOP SET', price: '₹ 2,500.00', image: image12, description: 'Coordinated crop top and skirt set in vibrant colors. Perfect for summer parties and festivals.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 6, name: 'WIDE LEG PANTS', price: '₹ 3,000.00', image: image13, description: 'Comfortable wide-leg pants in breathable linen. Effortless style for office or casual wear.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 7, name: 'LACE DRESS', price: '₹ 4,500.00', image: image14, description: 'Delicate lace dress with fitted bodice. Timeless piece for special occasions and weddings.', sizes: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 8, name: 'GRAPHIC TEE', price: '₹ 900.00', image: image15, description: 'Casual graphic tee with bold prints. Soft cotton fabric for everyday comfort.', sizes: ['XS', 'S', 'M', 'L', 'XL'] }
];

// --- New Data for the bottom section ---
const editItems = [
  { id: 1, title: "THE MONOCHROME EDIT", subtitle: "Effortless simplicity", image: editImage1 },
  { id: 2, title: "EVENING ELEGANCE", subtitle: "For the golden hour", image: editImage2 },
  { id: 3, title: "ESSENTIAL LAYERS", subtitle: "Curated comfort", image: editImage3 },
];


function Discover() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [cart, setCart] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const bannerRef = useRef(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);
  
  // --- New State and Ref for the bottom section ---
  const [editVisible, setEditVisible] = useState(false);
  const editRef = useRef(null);

  const bannerImages = [image6, image7];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Banner Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (bannerRef.current) observer.observe(bannerRef.current);
    return () => { if (bannerRef.current) observer.unobserve(bannerRef.current); };
  }, []);

  // Header Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHeaderVisible(true); },
      { threshold: 0.3 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => { if (headerRef.current) observer.unobserve(headerRef.current); };
  }, []);

  // --- New Observer for the bottom section ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setEditVisible(true); },
      { threshold: 0.2 } // Trigger when 20% visible
    );
    if (editRef.current) observer.observe(editRef.current);
    return () => { if (editRef.current) observer.unobserve(editRef.current); };
  }, []);


  const handleProductClick = (product, position) => {
    setSelectedProduct(product);
    setClickPosition(position);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setClickPosition(null);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    console.log('Added to cart:', item);
  };

  return (
    <div className="discover-container">
      <div
        ref={bannerRef}
        className={`discover-banner ${isVisible ? 'visible' : ''}`}
      >
        <div className={`banner-image ${currentImage === 0 ? 'active' : ''}`} style={{ backgroundImage: `url(${bannerImages[0]})` }}></div>
        <div className={`banner-image ${currentImage === 1 ? 'active' : ''}`} style={{ backgroundImage: `url(${bannerImages[1]})` }}></div>
        <div className="banner-overlay"></div>
        <div className="banner-content">
          <h1 className="banner-title">DISCOVER</h1>
          <p className="banner-subtitle">Elevate your style with timeless elegance and exquisite craftsmanship</p>
        </div>
      </div>

      <div className="discover-section">
        <div className="women-section-header">
          <h1 className="section-title">WOMEN'S FASHION</h1>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onProductClick={handleProductClick}
            />
          ))}
        </div>

        <div
          ref={headerRef}
          className={`women-header ${headerVisible ? 'visible' : ''}`}
        >
          <div className="header-line"></div>
          <Link to="/women" className="women-title">WOMEN</Link>
          <p className="women-subtitle">Timeless elegance in every step</p>
        </div>

        {/* --- NEW SECTION: The Edit --- */}
        <div 
          ref={editRef} 
          className={`the-edit-section ${editVisible ? 'visible' : ''}`}
        >
           <div className="edit-header">
             <h2 className="edit-main-title">CURATED LOOKBOOK</h2>
           </div>
           <div className="edit-grid">
             {editItems.map((item) => (
               <div key={item.id} className="edit-item">
                 <img src={item.image} alt={item.title} className="edit-img" />
                 <div className="edit-overlay-text">
                   <h3 className="edit-title">{item.title}</h3>
                   <p className="edit-subtitle">{item.subtitle}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
        {/* --- END NEW SECTION --- */}

        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            clickPosition={clickPosition}
            onClose={handleCloseModal}
            addToCart={addToCart}
          />
        )}
      </div>
    </div>
  );
}

export default Discover;