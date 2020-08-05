import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_FOOD_DETAILS = 'REQUEST_FOOD_DETAILS';
export const REQUEST_FOOD_DETAILS_FAILURE = 'REQUEST_FOOD_DETAILS_FAILURE';
export const REQUEST_FOOD_DETAILS_SUCCESS = 'REQUEST_FOOD_DETAILS_SUCCESS';

const requestFoodDetails = () => ({
  type: REQUEST_FOOD_DETAILS,
});

const requestFoodDetailsSuccess = (foodInfo) => ({
  type: REQUEST_FOOD_DETAILS_SUCCESS,
  foodInfo,
});

const requestFoodDetailsFailure = (error) => ({
  type: REQUEST_FOOD_DETAILS_FAILURE,
  error,
});


export const getFoodDetails = (URL) => {
  return (dispatch) => {
    dispatch(requestFoodDetails());
    return getRecipesAPI(URL).then(
      (data) => dispatch(requestFoodDetailsSuccess(data.meals)),
      (error) => dispatch(requestFoodDetailsFailure(error)),
    );
  };
};
