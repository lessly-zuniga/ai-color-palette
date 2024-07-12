import React from "react";
import PaletteGeneratorScreen from "./PaletteGeneratorScreen.tsx";
import { fetchPalette } from "../../api/api.ts"; // Asegúrate de que la ruta es correcta
import { hexToRgb, rgbToHex } from "../../utils/functions.ts";

const PaletteGeneratorController = () => {
  const generatePalette = async (colorValue) => {
    let color;
    if (colorValue.startsWith("#")) {
      color = hexToRgb(colorValue);
    } else if (colorValue.startsWith("rgb")) {
      const rgbValues = colorValue.match(/\d+/g).map(Number);
      color = { r: rgbValues[0], g: rgbValues[1], b: rgbValues[2] };
    } else {
      console.error("Invalid color format");
      return [];
    }

    try {
      const palette = await fetchPalette(color);
      return palette.map((color) => rgbToHex(color[0], color[1], color[2]));
    } catch (error) {
      console.error("Error generating palette:", error);
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
