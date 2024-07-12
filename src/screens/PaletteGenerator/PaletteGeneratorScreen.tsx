import React, { useState } from 'react';
import PaletteDisplay from '../../components/paletteDisplay/PaletteDisplay.tsx';
import './PaletteGenerator.css';

const PaletteGeneratorScreen = ({ generatePalette }) => {
  const [palette, setPalette] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleGenerate = async () => {
    const newPalette = await generatePalette(inputValue);
    setPalette(newPalette);
  };

  return (
    <div className="container">
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

export default PaletteGeneratorScreen;
