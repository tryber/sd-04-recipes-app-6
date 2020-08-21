import {
  REQUEST_AREA_SUCCESS,
  REQUEST_AREA_FAILURE,
  REQUEST_AREA,
} from '../actions/area';

const INITIAL_STATE = {
  isLoading: false,
  area: null,
};

const area = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_AREA:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_AREA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        area: action.data,
      };
    case REQUEST_AREA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default area;
