export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const removeDuplicates = (urls) => {
  return [...new Set(urls)];
};
