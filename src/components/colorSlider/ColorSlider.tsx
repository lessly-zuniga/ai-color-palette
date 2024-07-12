import React from 'react';
import './ColorSlider.css';

const ColorSlider = ({ colors, selectedColor, onColorChange }) => {
  const handleSliderChange = (event) => {
    const index = event.target.value;
    const color = `rgb(${colors[index].join(',')})`;
    onColorChange(color);
  };

  const gradientColors = colors.map(color => `rgb(${color.join(',')})`).join(', ');

  return (
    <div className="color-slider-container">
      <input 
        type="range" 
        className="color-slider" 
        min="0" 
        max={colors.length - 1} 
        step="1" 
        onChange={handleSliderChange} 
        style={{ background: `linear-gradient(to right, ${gradientColors})` }}
      />
      <div className="color-details">
        <div>
          <span>HEX: </span>
          <span>{selectedColor}</span>
        </div>
        <div>
          <span>RGB: </span>
          <span>{selectedColor.match(/\d+/g)?.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorSlider;
