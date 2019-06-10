export const singular = s => s.length > 0 ? s.slice(-3) === "ies" ? `${s.slice(0, s.length - 3)}y` : s.slice(0, s.length - 1) : "";
export const plural = s => s.length > 0 ? s.slice(-1) === "y" ? `${s.slice(0, s.length - 1)}ies` : `${s.slice(0, s.length)}s` : "";
export const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
export const snakeToCamel = s => s.length > 0 ? s.replace(/(_\w)/g, m => m[1].toUpperCase()) : "";
export const camelToSnake = s => s.length > 0 ? s.replace(/([A-Z])/g, $1 => `_${$1.toLowerCase()}`) : "";
export const snakeToTitle = s => s.length > 0
    ? s.toLowerCase()
        .split("_")
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(" ")
    : "";
export const titleToSnake = s => s.length > 0
    ? s.toLowerCase()
        .split(" ")
        .join("_")
    : "";

export const lowerToTitle = s => s.length > 0
    ? s.toLowerCase()
        .split(" ")
        .map(word => word.replace(word[0], word[0].toUpperCase()))
        .join(" ")
    : "";

