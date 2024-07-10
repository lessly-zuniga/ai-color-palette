const API_URL = process.env.REACT_APP_COLOR_API_URL;

if (!API_URL) {
  throw new Error("API URL ERROR");
}

export const fetchPalette = async (color?: { r: number; g: number; b: number } | null) => {
  const defaultColor = { r: 255, g: 0, b: 0 };
  const inputColors = color ? [[color.r, color.g, color.b], "N", "N", "N", "N"] : [[defaultColor.r, defaultColor.g, defaultColor.b], "N", "N", "N", "N"];

  const data = {
    model: 'default',
    input: inputColors
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch palette');
    }

    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error fetching palette:', error);
    throw error;
  }
};
