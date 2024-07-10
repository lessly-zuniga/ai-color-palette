import React from "react";

const PaletteDisplay = ({ palette }) => {
  return (
    <div className="palette-display">
      {palette.map((color, index) => (
        <div key={index}>
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
