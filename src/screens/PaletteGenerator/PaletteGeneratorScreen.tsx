import React, { useRef, useState, useEffect } from "react";
import Header from "../../components/header/Header.jsx";
import InputSection from "../../components/inputSection/InputSection.tsx";
import ImagePaletteSection from "../../components/imagePaletteSection/ImagePaletteSection.tsx";
import "./PaletteGenerator.css";

const PaletteGeneratorScreen = ({ generatePalette }) => {
  const inputSectionRef = useRef<HTMLDivElement>(null);
  const imagePaletteSectionRef = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("image");

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

  useEffect(() => {
    const handleScroll = () => {
      const imageSection = imagePaletteSectionRef.current;
      const colorSection = inputSectionRef.current;

      if (imageSection && colorSection) {
        const imageSectionTop = imageSection.getBoundingClientRect().top;
        const colorSectionTop = colorSection.getBoundingClientRect().top;

        if (imageSectionTop < window.innerHeight && imageSectionTop >= 0) {
          setActiveSection("image");
        } else if (
          colorSectionTop < window.innerHeight &&
          colorSectionTop >= 0
        ) {
          setActiveSection("color");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app-container">
      <Header
        activeSection={activeSection}
        scrollToInputSection={() => scrollToSection(inputSectionRef)}
        scrollToImagePaletteSection={() =>
          scrollToSection(imagePaletteSectionRef)
        }
      />
      <div id="image-colors" ref={imagePaletteSectionRef}>
        <ImagePaletteSection
          onImageUpload={handleImageUpload}
          uploadedImage={uploadedImage}
        />
      </div>
      <div id="code-colors" ref={inputSectionRef}>
        <InputSection
          generatePalette={handleGeneratePalette}
          palette={palette}
        />
      </div>
    </div>
  );
};

export default PaletteGeneratorScreen;
