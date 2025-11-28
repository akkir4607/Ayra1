import { useContext, useState } from 'react'
import { WishlistContext } from '../App'
import './WishlistSidebar.css'

function WishlistSidebar() {
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        className={`wishlist-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open wishlist"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span className="wishlist-count">{wishlist.length}</span>
      </button>

      {/* Sidebar Overlay */}
      <div
        className={`wishlist-overlay ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`wishlist-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>My Wishlist</h2>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close wishlist"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <p>Your wishlist is empty</p>
            <span className="empty-subtitle">Add items to save them for later</span>
          </div>
        ) : (
          <>
            <div className="wishlist-items">
              {wishlist.map(item => (
                <div key={item.id} className="wishlist-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-content">
                    <h4>{item.name}</h4>
                    <p className="item-price">{item.price}</p>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="sidebar-footer">
              <button className="add-all-cart-btn">Add All to Cart</button>
              <button className="clear-wishlist-btn" onClick={clearWishlist}>
                Clear Wishlist
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default WishlistSidebar