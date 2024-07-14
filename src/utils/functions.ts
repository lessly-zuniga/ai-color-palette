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

export const isDarkColor = (color: string): boolean => {
  let r, g, b;

  if (color.startsWith('#')) {
    const rgb = hexToRgb(color);
    r = rgb.r;
    g = rgb.g;
    b = rgb.b;
  } else if (color.startsWith('rgb')) {
    const rgbValues = color.match(/\d+/g)?.map(Number) || [0, 0, 0];
    [r, g, b] = rgbValues;
  } else {
    throw new Error('Invalid color format');
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

export const generateProvisionalPalette = () => {
  return [
    '#fffefb', 
    '#d4eaf7',
    '#cccbc8',
    '#71c4ef',
    '#00668c',
  ];
};
