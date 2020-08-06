import getRecipesAPI from '../../services/getRecipesApi';

export const REQUEST_RECOMMENDATIONS = 'REQUEST_RECOMMENDATIONS';
export const REQUEST_RECOMMENDATIONS_FAILURE =
  'REQUEST_RECOMMENDATIONS_FAILURE';
export const REQUEST_RECOMMENDATIONS_SUCCESS =
  'REQUEST_RECOMMENDATIONS_SUCCESS';

const requestRecommendations = () => ({
  type: REQUEST_RECOMMENDATIONS,
});

const requestRecommendationsSuccess = (recommendations) => ({
  type: REQUEST_RECOMMENDATIONS_SUCCESS,
  recommendations,
});

const requestRecommendationsFailure = (error) => ({
  type: REQUEST_RECOMMENDATIONS_FAILURE,
  error,
});

export const getRecommendations = (URL) => (dispatch) => {
  dispatch(requestRecommendations());
  return getRecipesAPI(URL).then(
    (data) => dispatch(requestRecommendationsSuccess(data)),
    (error) => dispatch(requestRecommendationsFailure(error))
  );
};
