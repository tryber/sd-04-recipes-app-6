import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_FOODS_OR_DRINKS = 'REQUEST_FOODS_OR_DRINKS';
export const REQUEST_FOODS_OR_DRINKS_FAILURE =
  'REQUEST_FOODS_OR_DRINKS_FAILURE';
export const REQUEST_FOODS_OR_DRINKS_SUCCESS =
  'REQUEST_FOODS_OR_DRINKS_SUCCESS';

const requestFoodOrDrinks = () => ({
  type: REQUEST_FOODS_OR_DRINKS,
});

const requestFoodOrDrinksFailure = (error) => ({
  type: REQUEST_FOODS_OR_DRINKS_FAILURE,
  error,
});

const requestFoodOrDrinksSuccess = (data) => ({
  type: REQUEST_FOODS_OR_DRINKS_SUCCESS,
  data,
});

export const getFoodsAndDrinks = (url) => (dispatch) => {
  dispatch(requestFoodOrDrinks());
  return getRecipesAPI(url).then(
    (data) => dispatch(requestFoodOrDrinksSuccess(data)),
    (error) => dispatch(requestFoodOrDrinksFailure(error)),
  );
};
