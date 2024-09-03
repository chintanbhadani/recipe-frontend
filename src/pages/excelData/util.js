// Convert Excel column letter (e.g., "A") to index (e.g., 0 for "A")
const excelColumnToIndex = (col) => {
  let index = 0;
  for (let i = 0; i < col.length; i++) {
    index = index * 26 + (col.charCodeAt(i) - "A".charCodeAt(0) + 1);
  }
  return index - 1;
};

export const parseCellReference = (cell) => {
  const match = cell.match(/([A-Z]+)(\d+)/);
  if (!match) return null;
  const col = excelColumnToIndex(match[1]);
  const row = parseInt(match[2]) - 1;
  return { row, col };
};

export const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
