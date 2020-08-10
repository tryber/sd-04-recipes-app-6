const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

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

export { setLocalStorage, getLocalStorage, updateLocalStorage };
