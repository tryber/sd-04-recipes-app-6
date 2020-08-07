import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodDetails } from '../redux/actions/foodDetails';
import { addInProgressFood } from '../redux/actions/recipesProgress';
import DrinkRecommendations from '../components/FoodDetailsComponents/DrinkRecommendations';
import Instructions from '../components/FoodDetailsComponents/Instructions';
import Ingredients from '../components/FoodDetailsComponents/Ingredients';
import VideoFrame from '../components/FoodDetailsComponents/VideoFrame';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodDetailsComponents/TitleAndButtons';

const FoodDetails = ({
  getFoodDetailsAPI,
  foodInfo,
  doneRecipes,
  inProgressFoodRecipes,
  addToInProgress,
}) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getFoodDetailsAPI(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
  }, []);
  const getIngredients = () => {
    const ingredientsNumber = Object.keys(foodInfo).filter((key) =>
      key.includes('strIngredient'),
    );
    const ingredientsKeys = ingredientsNumber.filter(
      (ingredientKey) => foodInfo[ingredientKey] !== '',
    );
    return ingredientsKeys;
  };

  const getIngredientsArray = () =>
    getIngredients().map((key) => foodInfo[key]);

  const isDone = doneRecipes.find((recipe) => recipe.id === foodInfo.idMeal);
  const inProgress = inProgressFoodRecipes.find(
    (recipeObj) => Object.keys(recipeObj)[0] === foodInfo.idMeal,
  );

  return (
    <div>
      {Object.keys(foodInfo).length > 0 && (
        <div className="details-container">
          <Image
            width={`${100}%`}
            test="recipe-photo"
            src={foodInfo.strMealThumb}
            alt={foodInfo.strMeal}
          />
          <TitleAndButtons
            title={foodInfo.strMeal}
            category={foodInfo.strCategory}
          />
          <Ingredients
            ingredients={getIngredients()}
            foodOrDrinkData={foodInfo}
          />
          <Instructions instructions={foodInfo.strInstructions} />
          <VideoFrame
            videoTitle={foodInfo.strMeal}
            videoURL={foodInfo.strYoutube}
          />
          <DrinkRecommendations />
        </div>
      )}
      {!isDone && (
        <div className="button-container">
          <Button
            onClick={() => {
              addToInProgress(foodInfo.idMeal, getIngredientsArray());
              history.push(`/comidas/${foodInfo.idMeal}/in-progress`);
            }}
            test="start-recipe-btn"
          >
            {inProgress ? 'Continuar Receita' : 'Iniciar Receita'}
          </Button>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => ({
  foodInfo: state.foodDetails.foodInfo,
  doneRecipes: state.recipesProgress.doneRecipes,
  inProgressFoodRecipes: state.recipesProgress.inProgressFoodRecipes,
});

const mapDispatch = {
  getFoodDetailsAPI: getFoodDetails,
  addToInProgress: addInProgressFood,
};

export default connect(mapState, mapDispatch)(FoodDetails);

FoodDetails.propTypes = {
  getFoodDetailsAPI: PropTypes.func.isRequired,
  addToInProgress: PropTypes.func.isRequired,
  foodInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  doneRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  inProgressFoodRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
