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

const checkExistenceInLocal = (id, key) => {
  const getLocal = getLocalStorage(key) || [];
  return getLocal.find((localObj) => localObj.id === id);
};

const checkInProgress = (actualId, type) => {
  const localProgressExist = getLocalStorage('inProgressRecipes');
  if (localProgressExist) {
    return Object.keys(localProgressExist[type]).find(
      (idInLocal) => idInLocal === actualId,
    );
  }
  return false;
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
  updateLocalStorage,
  updateFavorite,
  checkExistenceInLocal,
  checkInProgress,
};
