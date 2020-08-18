/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addInProgressDrink } from '../redux/actions/recipesProgress';
import FoodRecommendations from '../components/FoodOrDrinkDetailsComponents/FoodRecommendations';
import Instructions from '../components/FoodOrDrinkDetailsComponents/Instructions';
import Ingredients from '../components/FoodOrDrinkDetailsComponents/Ingredients';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodOrDrinkDetailsComponents/TitleAndButtons';
import { getDetails } from '../redux/actions/foodOrDrinkDetails';
import { updateLocalStorage, checkInProgress } from '../services/localStorage';
import getIngredients from '../services/getIngredients';

const FoodDetails = ({ getDrinkDetailsAPI, drinkDetails, addToInProgress, doneRecipes }) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getDrinkDetailsAPI(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
  }, []);

  const getIngredientsArray = () => getIngredients(drinkDetails).map((key) => drinkDetails[key]);

  const isDone = doneRecipes.some((doneObj) => doneObj.id === id);

  return (
    <div>
      {drinkDetails && (
        <div className="details-container">
          <Image
            width={`${100}%`}
            test="recipe-photo"
            src={drinkDetails.strDrinkThumb}
            alt={drinkDetails.strDrink}
          />
          <TitleAndButtons
            alcoholicOrNot={drinkDetails.strAlcoholic}
            category={drinkDetails.strCategory}
            id={drinkDetails.idDrink}
            image={drinkDetails.strDrinkThumb}
            title={drinkDetails.strDrink}
            type="bebida"
          />
          <Ingredients
            ingredients={getIngredients(drinkDetails)}
            foodOrDrinkData={drinkDetails}
          />
          <Instructions instructions={drinkDetails.strInstructions} />
          <FoodRecommendations />
        </div>
      )}
      {!isDone && (
        <div className="button-container">
          <Button
            onClick={() => {
              addToInProgress(drinkDetails.idDrink, getIngredientsArray());
              history.push(`/bebidas/${drinkDetails.idDrink}/in-progress`);
              updateLocalStorage('cocktails', drinkDetails.idDrink, getIngredientsArray());
            }}
            test="start-recipe-btn"
          >
            {checkInProgress(id, 'cocktails') ? 'Continuar Receita' : 'Iniciar Receita'}
          </Button>
        </div>
      )}
    </div>
  );
};

const mapState = (state) => ({
  drinkDetails: state.foodOrDrinkDetails.details.drinks[0],
  doneRecipes: state.recipesProgress.doneRecipes,
});

const mapDispatch = {
  getDrinkDetailsAPI: getDetails,
  addToInProgress: addInProgressDrink,
};

export default connect(mapState, mapDispatch)(FoodDetails);

FoodDetails.propTypes = {
  getDrinkDetailsAPI: PropTypes.func.isRequired,
  addToInProgress: PropTypes.func.isRequired,
  drinkDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  doneRecipes: PropTypes.objectOf(PropTypes.string).isRequired,
};
