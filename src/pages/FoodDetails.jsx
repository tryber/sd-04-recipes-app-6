/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDetails } from '../redux/actions/foodOrDrinkDetails';
import { addInProgressFood } from '../redux/actions/recipesProgress';
import DrinkRecommendations from '../components/FoodOrDrinkDetailsComponents/DrinkRecommendations';
import Instructions from '../components/FoodOrDrinkDetailsComponents/Instructions';
import Ingredients from '../components/FoodOrDrinkDetailsComponents/Ingredients';
import VideoFrame from '../components/FoodOrDrinkDetailsComponents/VideoFrame';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodOrDrinkDetailsComponents/TitleAndButtons';
import { updateLocalStorage, checkInProgress } from '../services/localStorage';
import getIngredients from '../services/getIngredients';

const FoodDetails = ({ getFoodDetailsAPI, foodDetails, addToInProgress, doneRecipes }) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getFoodDetailsAPI(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
  }, []);

  const getIngredientsArray = () => getIngredients(foodDetails).map((key) => foodDetails[key]);

  const isDone = doneRecipes.some((doneObj) => doneObj.id === id);

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
            ingredients={getIngredients(foodDetails)}
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
  doneRecipes: state.recipesProgress.doneRecipes,
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
  doneRecipes: PropTypes.objectOf(PropTypes.string).isRequired,
};
