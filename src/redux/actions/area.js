import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_AREA = 'REQUEST_AREA';

export const REQUEST_AREA_FAILURE = 'REQUEST_AREA_FAILURE';
export const REQUEST_AREA_SUCCESS = 'REQUEST_AREA_SUCCESS';

const requestArea = () => ({
  type: REQUEST_AREA,
});

const requestAreaFailure = (error) => ({
  type:REQUEST_AREA_FAILURE,
  error,
});

const requestAreaSuccess = (data) => ({
  type:REQUEST_AREA_SUCCESS,
  data,
});

export const getArea = (url) => (dispatch) => {
  dispatch(requestArea());
  return getRecipesAPI(url).then(
    (data) => dispatch(requestAreaSuccess(data)),
    (error) => dispatch(requestAreaFailure(error)),
  );
};
