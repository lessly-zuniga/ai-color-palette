import React, { useRef, useState } from "react";
import Header from "../../components/header/Header.jsx";
import InputSection from "../../components/inputSection/InputSection.tsx";
import ImagePaletteSection from "../../components/imagePaletteSection/ImagePaletteSection.tsx";

import "./PaletteGenerator.css";

const PaletteGeneratorScreen = ({ generatePalette }) => {
  const inputSectionRef = useRef(null);
  const imagePaletteSectionRef = useRef(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGeneratePalette = async (colorCode) => {
    const newPalette = await generatePalette(colorCode);
    setPalette(newPalette);
  };

  const handleImageUpload = (image) => {
    setUploadedImage(URL.createObjectURL(image));
  };

  return (
    <div className="app-container">
      <Header
        scrollToInputSection={() => scrollToSection(inputSectionRef)}
        scrollToImagePaletteSection={() =>
          scrollToSection(imagePaletteSectionRef)
        }
      />
      <div ref={imagePaletteSectionRef}>
        <ImagePaletteSection
          onImageUpload={handleImageUpload}
          uploadedImage={uploadedImage}
        />
      </div>
      <div ref={inputSectionRef}>
        <InputSection
          generatePalette={handleGeneratePalette}
          palette={palette}
        />
      </div>
    </div>
  );
};

export default PaletteGeneratorScreen;
