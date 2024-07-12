export const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');
  
    if (hex.length === 3) {
      hex = hex.split('').map((char) => char + char).join('');
    }
  
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
  
    return { r, g, b };
  };
  
  export const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (value: number) => {
      const hex = value.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
  
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };
  