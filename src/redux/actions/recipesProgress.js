export const ADD_IN_PROGRESS_FOOD = 'ADD_IN_PROGRESS_FOOD';
export const ADD_IN_PROGRESS_DRINK = 'ADD_IN_PROGRESS_DRINK';

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
