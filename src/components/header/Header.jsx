import React from 'react';
import './Header.css';

const Header = ({ activeSection, scrollToInputSection, scrollToImagePaletteSection }) => {
  return (
    <nav className="navbar-container">
      <div className="navbar-links">
        <a
          href="#image-colors"
          className={`nav-link ${activeSection === 'image' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToImagePaletteSection();
          }}
        >
          Image Palette Generator
        </a>
        <a
          href="#code-colors"
          className={`nav-link ${activeSection === 'color' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToInputSection();
          }}
        >
          Color Palette Generator
        </a>
      </div>
    </nav>
  );
};

export default Header;
