import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_DRINK_DETAILS = 'REQUEST_DRINK_DETAILS';
export const REQUEST_DRINK_DETAILS_FAILURE = 'REQUEST_DRINK_DETAILS_FAILURE';
export const REQUEST_DRINK_DETAILS_SUCCESS = 'REQUEST_DRINK_DETAILS_SUCCESS';

const requestDrinkDetails = () => ({
  type: REQUEST_DRINK_DETAILS,
});

const requestDrinkDetailsSuccess = (drinkInfo) => ({
  type: REQUEST_DRINK_DETAILS_SUCCESS,
  drinkInfo,
});

const requestDrinkDetailsFailure = (error) => ({
  type: REQUEST_DRINK_DETAILS_FAILURE,
  error,
});

export const getDrinkDetails = (URL) => (dispatch) => {
  dispatch(requestDrinkDetails());
  return getRecipesAPI(URL).then(
    (data) => dispatch(requestDrinkDetailsSuccess(data.drinks[0])),
    (error) => dispatch(requestDrinkDetailsFailure(error)),
  );
};
