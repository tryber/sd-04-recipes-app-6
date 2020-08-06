import {
  REQUEST_RECOMMENDATIONS,
  REQUEST_RECOMMENDATIONS_FAILURE,
  REQUEST_RECOMMENDATIONS_SUCCESS,
} from '../actions/recommendations';

const INITIAL_STATE = { isLoading: false };

const foodDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_RECOMMENDATIONS:
      return {
        ...state,
        isLoading: true,
      };

    case REQUEST_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case REQUEST_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        recommendationsList: action.recommendations,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default foodDetails;
