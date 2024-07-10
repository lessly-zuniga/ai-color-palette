import React from "react";
import PaletteGeneratorScreen from "./PaletteGeneratorScreen.tsx";
import { fetchPalette } from "../../api/api.ts";

const PaletteGeneratorController = () => {

    
  const generatePalette = async () => {
    try {
      const palette = await fetchPalette({ r: 236, g: 135, b: 228 })
      return palette.map((color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    } catch (error) {
      console.error('Error generating palette:', error);
      return [];
    }
  };

  return (
    <div>
      <PaletteGeneratorScreen generatePalette={generatePalette} />
    </div>
  );
};

export default PaletteGeneratorController;
