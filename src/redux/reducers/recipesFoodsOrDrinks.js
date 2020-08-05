import {
  REQUEST_FOODS_OR_DRINKS,
  REQUEST_FOODS_OR_DRINKS_SUCCESS,
  REQUEST_FOODS_OR_DRINKS_FAILURE,
} from '../actions/foodAndDrinks';

const INITIAL_STATE = { isLoading: false, recipes: [] };

const foodsOrDrinks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FOODS_OR_DRINKS:
      return {
        ...state,
        isLoading: true,
      };

    case REQUEST_FOODS_OR_DRINKS_SUCCESS:
      return {
        ...state,
        recipes: action.data,
        isLoading: false,
      };

    case REQUEST_FOODS_OR_DRINKS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
