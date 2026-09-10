export const objToArr = (arrValue?: string | string[]): string[] => {
  if (Array.isArray(arrValue)) {
    return arrValue;
  }

  if (!arrValue) {
    return [];
  }

  return arrValue
    .replace(/^\{|\}$/g, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
};