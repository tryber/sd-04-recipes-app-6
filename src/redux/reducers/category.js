import {
  REQUEST_CATEGORY,
  REQUEST_CATEGORY_SUCCESS,
  REQUEST_CATEGORY_FAILURE,
} from '../actions/category';

const INITIAL_STATE = {
  isLoading: false,
  recipesCategories: null,
};

const categories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_CATEGORY:
      return {
        ...state,
        isLoading: true,
      };
    case REQUEST_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipesCategories: action.data,
      };
    case REQUEST_CATEGORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default categories;
