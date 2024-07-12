import React, { useState } from 'react';
import './InputSection.css';
import PaletteDisplay from '../paletteDisplay/PaletteDisplay.tsx';

const InputSection = ({ generatePalette, palette }) => {
  const [inputValue, setInputValue] = useState('');

  const handleGenerate = async () => {
    await generatePalette(inputValue);
  };

  return (
    <div className="input-section">
      <div className="input-container">
        <input
          type="text"
          placeholder='Enter a color code (e.g., #FF0000)'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="styled-input"
        />
        <button className="styled-button" onClick={handleGenerate}>Generate Palette</button>
      </div>
      <PaletteDisplay palette={palette} />
    </div>
  );
};

export default InputSection;
