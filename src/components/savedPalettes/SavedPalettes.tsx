import React from 'react';
import './SavedPalettes.css';

interface SavedPaletteProps {
  palettes: {
    id: number;
    colors: string[];
  }[];
}

const SavedPalettes: React.FC<SavedPaletteProps> = ({ palettes }) => {
  return (
    <div className="saved-palettes">
      {palettes.map((savedPalette) => (
        <div key={savedPalette.id} className="saved-palette">
          {savedPalette.colors.map((color, index) => (
            <div key={index} className="color-block" style={{ backgroundColor: color }}>
              <span className="color-code">{color}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SavedPalettes;
