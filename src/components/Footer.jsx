import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Column 1: Help */}
          <div className="footer-column">
            <h3 className="footer-heading">May We Help You?</h3>
            <ul className="footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#order">My Order</a></li>
              <li><a href="#faqs">FAQs</a></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="footer-column">
            <h3 className="footer-heading">The Company</h3>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#commitment">Our Commitment</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
             
            </ul>
          </div>

          {/* Column 3: Store Locator & Newsletter */}
          <div className="footer-column">
            <h3 className="footer-heading">Location</h3>
            <div className="store-locator">
              <button className="store-locator-btn">
                <span>Country/Region, City</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>

            <h3 className="footer-heading">Sign Up For Updates</h3>
            <p className="newsletter-text">
              By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives. More details on this are provided in our{' '}
              <a href="#privacy">Privacy Policy</a>
            </p>
            
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="email-input-container">
                <svg className="email-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                  required
                />
                <button type="submit" className="email-submit">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </form>

            <div className="country-selector">
              <h3 className="footer-heading">Country/Region</h3>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="country-select"
              >
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Italy">Italy</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="India">India</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          {/* Logo */}
          <div className="footer-logo">
            <h1>AYRA</h1>
          </div>

          {/* Copyright */}
          <p className="footer-copyright">
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;