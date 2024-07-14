import React, { useState, useEffect } from "react";
import "./InputSection.css";
import PaletteDisplay from "../paletteDisplay/PaletteDisplay.tsx";
import SavedPalettes from "../savedPalettes/SavedPalettes.tsx";
import { generateProvisionalPalette } from "../../utils/functions.ts";

interface InputSectionProps {
  generatePalette: (color: string) => Promise<void>;
  palette: string[];
}

interface SavedPalette {
  id: number;
  colors: string[];
}


const InputSection: React.FC<InputSectionProps> = ({
  generatePalette,
  palette,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const provisionalPalette = generateProvisionalPalette();

  useEffect(() => {
    const storedPalettes = JSON.parse(
      localStorage.getItem("palettes") || "[]"
    ) as SavedPalette[];
    setSavedPalettes(storedPalettes);
  }, []);

  const handleGenerate = async () => {
    await generatePalette(inputValue);
    if (palette.length > 0) {
      const newPalette: SavedPalette = { id: Date.now(), colors: palette };
      const updatedPalettes = [newPalette, ...savedPalettes];
      setSavedPalettes(updatedPalettes);
      localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
    }
  };

  return (
    <div className="input-section">
      <h1>Generate Stunning Color Palettes from Hex or RGB</h1>
      <p style={{ marginBottom: 40, marginTop: 10 }}>
        Input a Hex or RGB color to instantly create a beautiful and cohesive color palette.
      </p>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a color code (e.g., #FF0000)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="styled-input"
        />
        <button className="styled-button" onClick={handleGenerate}>
          Generate Palette
        </button>
      </div>
      <PaletteDisplay palette={palette.length > 0 ? palette : provisionalPalette} />
      {savedPalettes.length > 0 && (<p style={{ marginBottom: 40, marginTop: 10, textAlign: 'left' }}>History</p> )}
      <SavedPalettes palettes={savedPalettes} />
    </div>
  );
};

export default InputSection;
