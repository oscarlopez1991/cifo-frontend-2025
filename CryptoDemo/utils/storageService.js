const FAVORITES_KEY = 'favoriteCryptos';
const DEFAULT_FAVORITES = ['bitcoin', 'ethereum', 'ripple'];

/**
 * Retrieves the list of favorite cryptocurrency IDs from localStorage.
 * If no favorites are set, it returns a default list.
 * @returns {string[]} An array of coin IDs.
 */
export const getFavorites = () => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  if (storedFavorites) {
    return JSON.parse(storedFavorites);
  }
  // If no favorites are in storage, set and return the default list.
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(DEFAULT_FAVORITES));
  return DEFAULT_FAVORITES;
};

/**
 * Saves a new list of favorite cryptocurrency IDs to localStorage.
 * @param {string[]} favoritesArray - An array of coin IDs to save.
 */
export const saveFavorites = (favoritesArray) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesArray));
};