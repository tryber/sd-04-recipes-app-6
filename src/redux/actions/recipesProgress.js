export const ADD_IN_PROGRESS_FOOD = 'ADD_IN_PROGRESS_FOOD';
export const ADD_IN_PROGRESS_DRINK = 'ADD_IN_PROGRESS_DRINK';
export const UPDATE_IN_PROGRESS = 'UPDATE_IN_PROGRESS';
export const ADD_DONE_RECIPE = 'ADD_DONE_FOOD_RECIPE';

export const addInProgressFood = (id, ingArray) => ({
  type: ADD_IN_PROGRESS_FOOD,
  id,
  ingArray,
});

export const addInProgressDrink = (id, ingArray) => ({
  type: ADD_IN_PROGRESS_DRINK,
  id,
  ingArray,
});

export const updateInProgress = (id, kind, ingredient) => ({
  type: UPDATE_IN_PROGRESS,
  id,
  kind,
  ingredient,
});

export const addDoneRecipe = (doneRecipeObj) => ({
  type: ADD_DONE_RECIPE,
  doneRecipeObj,
});
