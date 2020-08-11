const setLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

const updateLocalStorage = (type, recipeId, ingArray) => {
  const INITIAL_LOCAL = {
    cocktails: {},
    meals: {},
  };
  const recapLocal = getLocalStorage('inProgressRecipes') || INITIAL_LOCAL;
  recapLocal[type] = {
    ...recapLocal[type],
    [recipeId]: ingArray,
  };
  setLocalStorage('inProgressRecipes', recapLocal);
};

const removeItem = (items, id) => items.filter((item) => item.id !== id);

const checkFavorite = (id) => {
  const getFavorites = getLocalStorage('favoriteRecipes') || [];
  return getFavorites.find((favoriteObj) => favoriteObj.id === id);
};

export {
  setLocalStorage,
  getLocalStorage,
  updateLocalStorage,
  removeItem,
  checkFavorite,
};
