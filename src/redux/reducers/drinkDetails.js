import {
  REQUEST_DRINK_DETAILS,
  REQUEST_DRINK_DETAILS_SUCCESS,
  REQUEST_DRINK_DETAILS_FAILURE,
} from '../actions/drinkDetails';

const INITIAL_STATE = { isLoading: false, drinkInfo: [] };

const foodDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_DRINK_DETAILS:
      return {
        ...state,
        isLoading: true,
      };

    case REQUEST_DRINK_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case REQUEST_DRINK_DETAILS_SUCCESS:
      return {
        ...state,
        drinkInfo: action.drinkInfo,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default foodDetails;
