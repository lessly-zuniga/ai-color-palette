import React from 'react';
import './Header.css';

const Header = ({ scrollToInputSection, scrollToImagePaletteSection }) => {
  return (
    <nav className="navbar-container">
      <div className="navbar-links">
        <a href="#templates" className="nav-link" onClick={scrollToInputSection}>Color Palette Generator</a>
        <a href="#features" className="nav-link" onClick={scrollToImagePaletteSection}>Image Palette Generator</a>
      </div>
    </nav>
  );
};

export default Header;
