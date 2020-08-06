import {
  REQUEST_FOOD_DETAILS,
  REQUEST_FOOD_DETAILS_SUCCESS,
  REQUEST_FOOD_DETAILS_FAILURE,
} from '../actions/foodDetails';

const INITIAL_STATE = { isLoading: false, foodInfo: [] };

const foodDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_FOOD_DETAILS:
      return {
        ...state,
        isLoading: true,
      };

    case REQUEST_FOOD_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case REQUEST_FOOD_DETAILS_SUCCESS:
      return {
        ...state,
        foodInfo: action.foodInfo,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default foodDetails;
