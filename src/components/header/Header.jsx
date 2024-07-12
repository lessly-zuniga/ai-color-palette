import React from 'react';
import './Header.css';

const Header = ({ scrollToInputSection, scrollToImagePaletteSection }) => {
  return (
    <div className="header-container">
      <h1>AI Color Palette Generator</h1>
      <p>Upload an image or select a starting color to generate a beautiful color palette.</p>
      <div className="button-container">
        <button className="styled-button" onClick={scrollToImagePaletteSection}>Upload Image</button>
        <button className="styled-button" onClick={scrollToInputSection}>Select Color</button>
      </div>
    </div>
  );
};

export default Header;
