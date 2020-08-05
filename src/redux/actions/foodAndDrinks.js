import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_FOODS_OR_DRINKS = 'REQUEST_FOODS_OR_DRINKS';
export const REQUEST_FOODS_OR_DRINKS_FAILURE = 'REQUEST_FOODS_OR_DRINKS_FAILURE';
export const REQUEST_FOODS_OR_DRINKS_SUCCESS = 'REQUEST_FOODS_OR_DRINKS_SUCCESS';

const requestFoodOrDrinks = () => ({
  type: REQUEST_FOODS_OR_DRINKS,
});

const requestFoodOrDrinks_Failure = (error) => ({
  type: REQUEST_FOODS_OR_DRINKS_FAILURE,
  error,
});

const requestFoodOrDrinks_Success = (data) => ({
  type: REQUEST_FOODS_OR_DRINKS_SUCCESS,
  data,
});

export const getFoodsAndDrinks = (url) => {
  return (dispatch) => {
    dispatch(requestFoodOrDrinks());
    return getRecipesAPI(url).then(
      (data) => dispatch(requestFoodOrDrinks_Success(data)),
      (error) => dispatch(requestFoodOrDrinks_Failure(error)),
    );
  };
};
