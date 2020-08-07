import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_CATEGORY = 'REQUEST_CATEGORY';

export const REQUEST_CATEGORY_FAILURE = 'REQUEST_CATEGORY_FAILURE';
export const REQUEST_CATEGORY_SUCCESS = 'REQUEST_CATEGORY_SUCCESS';

const requestCategory = () => ({
  type: REQUEST_CATEGORY,
});

const requestCategoryFailure = (error) => ({
  type: REQUEST_CATEGORY_FAILURE,
  error,
});

const requestCategorySuccess = (data) => ({
  type: REQUEST_CATEGORY_SUCCESS,
  data,
});

export const getCategory = (url) => (dispatch) => {
  dispatch(requestCategory());
  return getRecipesAPI(url).then(
    (data) => dispatch(requestCategorySuccess(data)),
    (error) => dispatch(requestCategoryFailure(error)),
  );
};
