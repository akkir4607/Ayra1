import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useContext(CartContext);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <div className="navbar-container">
          
          <div className="logo">
            <Link to="/" onClick={closeMenu}>
              <h1>AYRA</h1>
            </Link>
          </div>

          <div className="nav-desktop">
            <a href="#search" className="nav-link">SEARCH</a>
            <a href="#login" className="nav-link">LOG IN</a>
            <a href="#help" className="nav-link">HELP</a>
            <button onClick={toggleCart} className="nav-link cart-button">
              SHOPPING BAG [{getCartCount()}]
            </button>
          </div>

          <div 
            className={`menu-icon ${isMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
          <div className="mobile-links-container">
            <a href="#search" className="mobile-link" onClick={closeMenu}>SEARCH</a>
            <a href="#login" className="mobile-link" onClick={closeMenu}>LOG IN</a>
            <a href="#help" className="mobile-link" onClick={closeMenu}>HELP</a>
            <button 
              onClick={() => { closeMenu(); toggleCart(); }} 
              className="mobile-link cart-button-mobile"
            >
              SHOPPING BAG [{getCartCount()}]
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar Overlay */}
      <div 
        className={`cart-overlay ${isCartOpen ? 'active' : ''}`}
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>SHOPPING BAG</h2>
          <button className="cart-close" onClick={toggleCart}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p>Your shopping bag is empty</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-size">Size: {item.selectedSize}</p>
                  <p className="cart-item-price">{item.price}</p>
                  
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                      className="qty-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id, item.selectedSize)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>TOTAL</span>
              <span className="total-price">₹ {getCartTotal().toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;