export const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    return "/api/v1";
  }
  return import.meta.env.VITE_BASE_URL || "https://api.alphatrack.app/api/v1";
};

export const getImageUrl = () => {
  return import.meta.env.VITE_IMAGE_URL || "https://api.alphatrack.app";
};
