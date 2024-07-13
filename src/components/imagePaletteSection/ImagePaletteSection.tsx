import React, { useEffect, useState, useRef } from "react";
import "./ImagePaletteSection.css";
import ColorThief from "colorthief";
import DefaultImage from "../../assets/images/default-palette-img.png";
import ColorSlider from "../colorSlider/ColorSlider.tsx";
import { isDarkColor, rgbToHex } from "../../utils/functions.ts";

const ImagePaletteSection = ({ onImageUpload, uploadedImage }) => {
  const [colors, setColors] = useState<number[][]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const extractColors = (imageSrc: string) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 5);
      setColors(palette);
      setSelectedColor(`rgb(${palette[0].join(",")})`);
    };
  };

  const handleImageClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (imageRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        canvas.width = imageRef.current.width;
        canvas.height = imageRef.current.height;
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const rgb = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
        setSelectedColor(rgb);
      }
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (imageRef.current) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const rect = imageRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        canvas.width = imageRef.current.width;
        canvas.height = imageRef.current.height;
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        const rgb = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
        setSelectedColor(rgb);
      }
    }
  };

  useEffect(() => {
    if (uploadedImage) {
      extractColors(uploadedImage);
    } else {
      extractColors(DefaultImage);
    }
  }, [uploadedImage]);

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

  const handleSelectedColorClick = () => {
    if (selectedColor) {
      copyToClipboard(selectedColor);
    }
  };

  return (
    <div className="image-palette-section">
      <div className="image-palette-content">
        <div className="image-upload">
          <div>
            <h1>Image Palette Generator</h1>
            <p>
              Upload an image or select a starting color to generate a beautiful
              color palette.
            </p>
            <input
              type="file"
              onChange={handleImageChange}
              className="file-input"
              ref={fileInputRef}
            />
            <button className="styled-button" onClick={handleButtonClick}>
              Upload Your Own Image
            </button>
            {selectedColor && (
              <div
                className="selected-color-display"
                onClick={handleSelectedColorClick}
              >
                <div
                  className="selected-color-preview"
                  style={{ backgroundColor: selectedColor }}
                ></div>
                <p>{selectedColor}</p>
              </div>
            )}
            <ColorSlider
              colors={colors}
              selectedColor={selectedColor || "#ffffff"}
              onColorChange={setSelectedColor}
            />
          </div>
          <div className="color-palette">
            {colors.map((color, index) => {
              const colorString = `rgb(${color.join(",")})`;
              const hexColor = rgbToHex(color[0], color[1], color[2]);
              return (
                <div
                  key={index}
                  className={`color-swatch ${
                    selectedColor === colorString ? "selected" : ""
                  }`}
                  style={{ backgroundColor: colorString }}
                  onClick={() => {
                    setSelectedColor(colorString);
                    copyToClipboard(colorString);
                  }}
                >
                  <p
                    className="color-text"
                    style={{
                      color: isDarkColor(colorString) ? "#FFFFFF" : "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {hexColor.toUpperCase()}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="image-preview-container">
          <div className="image-preview">
            <img
              src={uploadedImage || DefaultImage}
              alt="Preview"
              className="preview-image"
              ref={imageRef}
              onClick={handleImageClick}
              onMouseMove={handleMouseMove}
            />
          </div>
        </div>
      </div>
      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );
};

export default ImagePaletteSection;
