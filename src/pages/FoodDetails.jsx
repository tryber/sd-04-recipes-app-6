/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDetails } from '../redux/actions/foodOrDrinkDetails';
import { addInProgressFood } from '../redux/actions/recipesProgress';
import DrinkRecommendations from '../components/FoodDetailsComponents/DrinkRecommendations';
import Instructions from '../components/FoodDetailsComponents/Instructions';
import Ingredients from '../components/FoodDetailsComponents/Ingredients';
import VideoFrame from '../components/FoodDetailsComponents/VideoFrame';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodDetailsComponents/TitleAndButtons';
import { updateLocalStorage, getLocalStorage, checkInProgress } from '../services/localStorage';

const FoodDetails = ({ getFoodDetailsAPI, foodDetails, addToInProgress }) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getFoodDetailsAPI(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
  }, []);
  const getIngredients = () => {
    const ingredientsNumber = Object.keys(foodDetails).filter((key) =>
      key.includes('strIngredient'),
    );
    const ingredientsKeys = ingredientsNumber.filter((ingKey) => foodDetails[ingKey] !== '')
      .filter((ingredientKey) => foodDetails[ingredientKey] !== null);
    return ingredientsKeys;
  };

  const getIngredientsArray = () =>
    getIngredients().map((key) => foodDetails[key]);

  const isDone =
    getLocalStorage('doneRecipes') ||
    [].find((recipe) => recipe.id === foodDetails.idMeal);

  return (
    <div>
      {foodDetails && (
        <div className="details-container">
          <Image
            width={`${100}%`}
            test="recipe-photo"
            src={foodDetails.strMealThumb}
            alt={foodDetails.strMeal}
          />
          <TitleAndButtons
            area={foodDetails.strArea}
            category={foodDetails.strCategory}
            id={foodDetails.idMeal}
            image={foodDetails.strMealThumb}
            title={foodDetails.strMeal}
            type="comida"
          />
          <Ingredients
            ingredients={getIngredients()}
            foodOrDrinkData={foodDetails}
          />
          <Instructions instructions={foodDetails.strInstructions} />
          <VideoFrame
            videoTitle={foodDetails.strMeal}
            videoURL={foodDetails.strYoutube}
          />
          <DrinkRecommendations />
        </div>
      )}
      {!isDone && (
        <div className="button-container">
          <Button
            onClick={() => {
              addToInProgress(foodDetails.idMeal, getIngredientsArray());
              history.push(`/comidas/${foodDetails.idMeal}/in-progress`);
              updateLocalStorage(
                'meals',
                foodDetails.idMeal,
                getIngredientsArray(),
              );
            }}
            test="start-recipe-btn"
          >
            {checkInProgress(id, 'meals') ? 'Continuar Receita' : 'Iniciar Receita'}
          </Button>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => ({
  foodDetails: state.foodOrDrinkDetails.details.meals[0],
});

const mapDispatch = {
  getFoodDetailsAPI: getDetails,
  addToInProgress: addInProgressFood,
};

export default connect(mapState, mapDispatch)(FoodDetails);

FoodDetails.propTypes = {
  getFoodDetailsAPI: PropTypes.func.isRequired,
  addToInProgress: PropTypes.func.isRequired,
  foodDetails: PropTypes.objectOf(PropTypes.string).isRequired,
};
