export const orderAlphabetically = (obj, key) => obj.sort((a, b) => a[key].localeCompare(b[key]));