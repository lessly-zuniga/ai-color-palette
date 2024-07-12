import React from "react";
import "./PaletteDisplay.css";

const PaletteDisplay = ({ palette }) => {
  return (
    <div className="palette-display">
      {palette.map((color, index) => (
        <div key={index} className="color-container">
          <div
            key={index}
            style={{ backgroundColor: color }}
            className="color-box"
          />
          <p>{color}</p>
        </div>
      ))}
    </div>
  );
};

export default PaletteDisplay;
