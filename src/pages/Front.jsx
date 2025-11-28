// Front.jsx
import { useState } from 'react'
import './Front.css'
import bannerImage from '../images/8.jpg'
import image6 from '../images/5.jpg'
import Women from './Women'
import Men from './Men'
import Footer from '../components/Footer'
function Front() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="front-page">
      {/* Banner Section */}
      <div className="front-container">
        {/* TEXT OUTSIDE IMAGE - BOTTOM RIGHT CORNER */}
        <div className="outside-text">
          <h1>DISCOVER THE PREMIUMNESS</h1>
          <p>SUMMER 2026</p>
        </div>

        {/* IMAGE BANNER */}
        <div 
          className={`banner ${isHovered ? 'hovered' : ''}`}
          style={{backgroundImage: `url(${bannerImage})`}}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="banner-overlay"></div>
        </div>
      </div>

      {/* Women Collection Section */}
      <Women />
      <Men />
      <div className="extra-section">
        <img src={image6} alt="New Collection" className="extra-image" />
        <h2 className="collection-overlay">
          NEW COLLECTION <span className="arrow">→</span>
        </h2>
        
      </div>
      
    </div>
  )
}

export default Front