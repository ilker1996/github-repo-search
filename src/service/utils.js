/**
 * Gives RGB color value usinn a hash function and the given string
 * @param {string} str String to generate RGB value
 * @return {string} RGB color value generated
 */
export const stringToRGB = (str) => {
  if(!str) {
    return "#FFFFFF";
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 1) + hash * 16);
  }

  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();

  return "#" + "000000".substring(0, 6 - c.length) + c
} 