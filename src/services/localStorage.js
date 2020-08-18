const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const clearLocalStorage = () => localStorage.clear();

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
  const getLocal = getLocalStorage('favoriteRecipes') || [];
  return getLocal.some((localObj) => localObj.id === id);
};

const checkInProgress = (actualId, type) => {
  const localProgressExist = getLocalStorage('inProgressRecipes');
  if (localProgressExist) {
    return Object.keys(localProgressExist[type]).some(
      (idInLocal) => idInLocal === actualId,
    );
  }
  return false;
};

const updateIngredientsLocal = (id, type, selectedIngredient) => {
  const getInProgress = getLocalStorage('inProgressRecipes');
  if (
    getInProgress[type][id].some((localIng) => localIng === selectedIngredient)
  ) {
    getInProgress[type][id] = getInProgress[type][id].filter(
      (localIngredient) => localIngredient !== selectedIngredient,
    );
    return setLocalStorage('inProgressRecipes', getInProgress);
  }
  getInProgress[type][id].push(selectedIngredient);
  return setLocalStorage('inProgressRecipes', getInProgress);
};

const checkIngredientLocal = (id, type, selectedIngredient) => {
  const getInProgress = getLocalStorage('inProgressRecipes');
  if (getInProgress) {
    return getInProgress[type][id].some(
      (localIng) => localIng === selectedIngredient,
    );
  }
  return true;
};

const updateFavorite = (
  id,
  type,
  area,
  category,
  alcoholicOrNot,
  title,
  image,
) => {
  const newFavorite = {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name: title,
    image,
  };
  const getFavorites = getLocalStorage('favoriteRecipes') || [];
  if (getFavorites.find((favoriteObj) => favoriteObj.id === id)) {
    return setLocalStorage('favoriteRecipes', removeItem(getFavorites, id));
  }
  return setLocalStorage('favoriteRecipes', [...getFavorites, newFavorite]);
};

export {
  setLocalStorage,
  getLocalStorage,
  clearLocalStorage,
  updateLocalStorage,
  updateFavorite,
  checkFavorite,
  checkInProgress,
  updateIngredientsLocal,
  checkIngredientLocal,
};
