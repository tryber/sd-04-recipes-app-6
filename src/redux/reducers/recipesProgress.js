import {
  ADD_IN_PROGRESS_FOOD,
  ADD_IN_PROGRESS_DRINK,
  UPDATE_IN_PROGRESS,
} from '../actions/recipesProgress';
import { setLocalStorage, getLocalStorage } from '../../services/localStorage';

const INITIAL_STATE = {
  inProgressRecipes: getLocalStorage('inProgressRecipes') || [],
  doneRecipes: [],
};

const recipesProgress = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_IN_PROGRESS_FOOD:
      return {
        ...state,
        inProgressRecipes: {
          ...state.inProgressRecipes,
          meals: {
            ...state.inProgressRecipes.meals,
            [action.id]: action.ingArray,
          },
        },
      };
    case ADD_IN_PROGRESS_DRINK:
      return {
        ...state,
        inProgressRecipes: {
          ...state.inProgressRecipes,
          cocktails: {
            ...state.inProgressRecipes.cocktails,
            [action.id]: action.ingArray,
          },
        },
      };
    case UPDATE_IN_PROGRESS:
      if (
        state.inProgressRecipes[action.kind][action.id].includes(
          action.ingredient
        )
      ) {
        return {
          ...state,
          inProgressRecipes: {
            ...state.inProgressRecipes,
            [action.kind]: {
              ...state.inProgressRecipes[action.kind],
              [action.id]: state.inProgressRecipes[action.kind][action.id].filter(
                (stateIng) => stateIng !== action.ingredient
              ),
            },
          },
        };
      }
      return {
        ...state,
        inProgressRecipes: {
          ...state.inProgressRecipes,
          [action.kind]: {
            ...state.inProgressRecipes[action.kind],
            [action.id]: state.inProgressRecipes[action.kind][action.id].concat(
              action.ingredient
            ),
          },
        },
      };

    default:
      return state;
  }
};

export default recipesProgress;
