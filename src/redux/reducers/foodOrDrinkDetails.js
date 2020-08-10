import {
  REQUEST_DETAILS,
  REQUEST_DETAILS_SUCCESS,
  REQUEST_DETAILS_FAILURE,
} from '../actions/foodOrDrinkDetails';

const INITIAL_STATE = { isLoading: false, details: { meals: [], drinks: [] } };

const foodOrDrinkDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_DETAILS:
      return {
        ...state,
        isLoading: true,
      };

    case REQUEST_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case REQUEST_DETAILS_SUCCESS:
      return {
        ...state,
        details: action.details,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default foodOrDrinkDetails;
