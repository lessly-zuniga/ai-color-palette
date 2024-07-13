import React, { useState } from "react";
import "./SavedPalettes.css";
import { hexToRgb, isDarkColor } from "../../utils/functions.ts";

interface SavedPaletteProps {
  palettes: {
    id: number;
    colors: string[];
  }[];
}

const SavedPalettes: React.FC<SavedPaletteProps> = ({ palettes }) => {
  const [copyMessage, setCopyMessage] = useState<string | null>(null);

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color).then(
      () => {
        setCopyMessage(`${color} copied to clipboard!`);
        setTimeout(() => setCopyMessage(null), 2000);
      },
      () => {
        setCopyMessage(`Failed to copy ${color}`);
        setTimeout(() => setCopyMessage(null), 2000);
      }
    );
  };

  return (
    <div className="saved-palettes">
      {palettes.map((savedPalette) => (
        <div key={savedPalette.id} className="saved-palette">
          {savedPalette.colors.map((color, index) => (
            <div
              key={index}
              className="color-block"
              style={{ backgroundColor: color }}
              onClick={() => copyToClipboard(color)}
            >
              <span
                className="color-code"
                style={{
                  color: isDarkColor(color) ? '#FFFFFF' : '#000000',
                  fontWeight: 'bold',
                }}
              >
                {color.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      ))}
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );
};

export default SavedPalettes;
