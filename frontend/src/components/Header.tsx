import React from 'react';
import './Header.css';

interface HeaderProps {
  cafeName: string;
  tagline: string;
}

/**
 * Header Component
 * Displays the cafe name, logo, and navigation
 */
const Header: React.FC<HeaderProps> = ({ cafeName, tagline }) => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo and Name Section */}
        <div className="header-brand">
          <div className="logo-circle">
            <span className="logo-text">새재당</span>
          </div>
          <div className="header-title">
            <h1 className="cafe-name">{cafeName}</h1>
            <p className="cafe-tagline">{tagline}</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="header-nav">
          <a href="#gallery" className="nav-link">Gallery</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#order" className="nav-link order-link">택배주문</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
