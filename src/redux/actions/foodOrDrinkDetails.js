import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_DETAILS = 'REQUEST_DETAILS';
export const REQUEST_DETAILS_FAILURE = 'REQUEST_DETAILS_FAILURE';
export const REQUEST_DETAILS_SUCCESS = 'REQUEST_DETAILS_SUCCESS';

const requestDetails = () => ({
  type: REQUEST_DETAILS,
});

const requestDetailsSuccess = (details) => ({
  type: REQUEST_DETAILS_SUCCESS,
  details,
});

const requestDetailsFailure = (error) => ({
  type: REQUEST_DETAILS_FAILURE,
  error,
});

export const getDetails = (URL) => (dispatch) => {
  dispatch(requestDetails());
  return getRecipesAPI(URL).then(
    (data) => dispatch(requestDetailsSuccess(data)),
    (error) => dispatch(requestDetailsFailure(error)),
  );
};
