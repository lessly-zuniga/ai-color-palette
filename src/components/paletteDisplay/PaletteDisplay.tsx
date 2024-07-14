import React, { useState } from "react";
import "./PaletteDisplay.css";
import { isDarkColor } from "../../utils/functions.ts";

const PaletteDisplay = ({ palette }) => {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color).then(
      () => {
        setCopiedColor(color);
        setCopyMessage(`${color} copied to clipboard!`);
        setTimeout(() => {
          setCopyMessage(null);
          setCopiedColor(null);
        }, 2000);
      },
      () => {
        setCopyMessage(`Failed to copy ${color}`);
        setTimeout(() => setCopyMessage(null), 2000);
      }
    );
  };

  return (
    <div className="palette-display">
      {palette.map((color, index) => (
        <div
          key={index}
          className="color-container"
          onClick={() => copyToClipboard(color)}
        >
          <div style={{ backgroundColor: color }} className="color-box">
            {copiedColor === color ? "✔" : ""}
            <p
              className="color-text"
              style={{
                color: isDarkColor(color) ? "#FFFFFF" : "#000000",
                fontWeight: "bold",
              }}
            >
              {color.toUpperCase()}
            </p>
          </div>
        </div>
      ))}
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );
};

export default PaletteDisplay;
