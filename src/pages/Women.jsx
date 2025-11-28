import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../App';
import './Women.css';
import ProductDetail from './ProductDetail';
import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';

const products = [
  {
    id: 'women-1',
    name: ' CHELSEA BOOTS',
    price: '₹ 950.00',
    image: image1,
    description: 'Premium leather Chelsea boots with elastic side panels. Crafted from high-quality leather with a durable rubber sole. Perfect for both casual and formal occasions.',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
  },
  {
    id: 'women-2',
    name: 'LEAT BOOTS',
    price: '₹ 5,950.00',
    image: image2,
    description: 'Timeless leather boots designed for comfort and style. Features premium craftsmanship with attention to every detail. Versatile design suitable for any wardrobe.',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
  },
  {
    id: 'women-3',
    name: 'LEATHERITH MASK DETAIL',
    price: '₹ 8,550.00',
    image: image3,
    description: 'Elegant leather moccasins with mask detail. Handcrafted from the finest materials for superior comfort. A sophisticated choice for the modern individual.',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
  },
  {
    id: 'women-4',
    name: 'LEATHER SMART DECK SHOES',
    price: '₹ 8,550.00',
    image: image4,
    description: 'Premium leather smart deck shoes combining style and functionality. Perfect for casual sophistication with exceptional build quality.',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10']
  }
];

const ProductCard = ({ product, onProductClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

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
        className={`wishlist-icon ${isInWishlist(product.id) ? 'active' : ''}`}
        onClick={handleWishlistClick}
        aria-label="Add to wishlist"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </div>
  );
};

function Women() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const handleProductClick = (product, position) => {
    setSelectedProduct(product);
    setClickPosition(position);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setClickPosition(null);
  };

  return (
    <div className="women-container">
      <div className="women-section-header">
        <h1 className="section-title">WOMEN's Section</h1>
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
        <Link to="/discover" className="women-title">DISCOVER Women</Link>
        <p className="women-subtitle">Timeless elegance in every step</p>
      </div>

      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct}
          clickPosition={clickPosition}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default Women;