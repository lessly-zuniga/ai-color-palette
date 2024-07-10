import React, { useState } from 'react';
import PaletteDisplay from '../../components/PaletteDisplay.tsx';

const PaletteGeneratorScreen = ({ generatePalette }) => {
  const [palette, setPalette] = useState<string[]>([]);

  const handleGenerate = async () => {
    const newPalette = await generatePalette();
    setPalette(newPalette);
  };

  console.log(palette, 'palette');
  return (
    <div>
      <button onClick={handleGenerate}>Generate Palette</button>
      <PaletteDisplay palette={palette} />
    </div>
  );
};

export default PaletteGeneratorScreen;
