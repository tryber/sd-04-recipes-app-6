import {
  ADD_IN_PROGRESS_FOOD,
  ADD_IN_PROGRESS_DRINK,
} from '../actions/recipesProgress';
import { setLocalStorage } from '../../services/localStorage';

const INITIAL_STATE = {
  inProgressFoodRecipes: [],
  inProgressDrinkRecipes: [],
  doneRecipes: [],
};

const recipesProgress = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IN_PROGRESS_FOOD:
      setLocalStorage('inProgressRecipes', {
        cocktails: { ...state.inProgressDrinkRecipes },
        meals: { ...state.inProgressFoodRecipes, [action.id]: action.ingArray },
      });
      return {
        ...state,
        inProgressFoodRecipes: [
          ...state.inProgressFoodRecipes,
          { [action.id]: action.ingArray },
        ],
      };
    case ADD_IN_PROGRESS_DRINK:
      setLocalStorage('inProgressRecipes', {
        cocktails: {
          ...state.inProgressDrinkRecipes,
          [action.id]: action.ingArray,
        },
        meals: { ...state.inProgressFoodRecipes },
      });
      return {
        ...state,
        inProgressDrinkRecipes: [
          ...state.inProgressDrinkRecipes,
          { [action.id]: action.ingArray },
        ],
      };
    default:
      return state;
  }
};

export default recipesProgress;
