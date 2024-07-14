import React, { useEffect, useState } from "react";
import "./ColorSlider.css";
import { hexToRgb, rgbToHex } from "../../utils/functions.ts";

const ColorSlider = ({ colors, selectedColor, onColorChange }) => {
  const [colorRGB, setColorRGB] = useState("");
  const [colorHEX, setColorHEX] = useState("");

  useEffect(() => {
    if (selectedColor.startsWith("#")) {
      const rgb = hexToRgb(selectedColor);
      setColorRGB(`rgb(${rgb.r},${rgb.g},${rgb.b})`);
      setColorHEX(selectedColor);
    } else if (selectedColor.startsWith("rgb")) {
      const rgbValues = selectedColor.match(/\d+/g)?.map(Number) || [0, 0, 0];
      const hex = rgbToHex(rgbValues[0], rgbValues[1], rgbValues[2]);
      setColorRGB(selectedColor);
      setColorHEX(hex);
    }
  }, [selectedColor]);

  const handleSliderChange = (event) => {
    const index = event.target.value;
    const color = `rgb(${colors[index].join(",")})`;
    onColorChange(color);
  };

  const gradientColors = colors
    .map((color) => `rgb(${color.join(",")})`)
    .join(", ");

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
          <span>{colorHEX.toUpperCase()}</span>
        </div>
        <div>
          <span>RGB: </span>
          <span>{colorRGB}</span>
        </div>
      </div>
    </div>
  );
};

export default ColorSlider;
