/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDetails } from '../redux/actions/foodOrDrinkDetails';
import {
  addDoneFoodRecipe,
  addInProgressDrink,
} from '../redux/actions/recipesProgress';
import Ingredients from '../components/FoodDetailsComponents/Ingredients';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodDetailsComponents/TitleAndButtons';
import { getLocalStorage, updateLocalStorage } from '../services/localStorage';
import Instructions from '../components/FoodDetailsComponents/Instructions';

const DrinksInProgress = ({
  getDrinkDetailsAPI,
  addToInProgress,
  drinkDetails,
  addToDone,
  inProgressRecipes,
}) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if (!drinkDetails) {
      getDrinkDetailsAPI(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, []);
  const getIngredients = () => {
    const ingredientsNumber = Object.keys(drinkDetails).filter((key) =>
      key.includes('strIngredient'),
    );
    const ingredientsKeys = ingredientsNumber.filter((ingKey) => drinkDetails[ingKey] !== null)
      .filter((ingredientKey) => drinkDetails[ingredientKey] !== '');
    // tive que filtrar duas vezes pq essa API é ruim demais!!! Uma hora tem "" outra hora tem null
    return ingredientsKeys;
  };

  useEffect(() => {
    const getInProgress = getLocalStorage('inProgressRecipes');
    if (drinkDetails && (!getInProgress || (getInProgress && !getInProgress.cocktails[id]))) {
      const getIngredientsArray = () => getIngredients().map((key) => drinkDetails[key]);
      updateLocalStorage('cocktails', id, getIngredientsArray());
      addToInProgress(id, getIngredientsArray());
    }
  }, [drinkDetails]);

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
            area={drinkDetails.strArea}
            category={drinkDetails.strCategory}
            id={drinkDetails.idDrink}
            image={drinkDetails.strDrinkThumb}
            title={drinkDetails.strDrink}
            type="bebida"
          />
          <Ingredients
            type="cocktails"
            id="idDrink"
            checkbox
            ingredients={getIngredients()}
            foodOrDrinkData={drinkDetails}
          />
          <Instructions instructions={drinkDetails.strInstructions} />
        </div>
      )}
      <div className="button-container">
        <Button
          onClick={() => {
            addToDone(drinkDetails);
            history.push('/receitas-feitas');
          }}
          disabled={inProgressRecipes.cocktails && inProgressRecipes.cocktails[id].length > 0}
          test="finish-recipe-btn"
        >
          Finalizar Receita
        </Button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  drinkDetails: state.foodOrDrinkDetails.details.drinks[0],
  inProgressRecipes: state.recipesProgress.inProgressRecipes,
});

const mapDispatch = {
  getDrinkDetailsAPI: getDetails,
  addToDone: addDoneFoodRecipe,
  addToInProgress: addInProgressDrink,
};

export default connect(mapState, mapDispatch)(DrinksInProgress);

DrinksInProgress.propTypes = {
  getDrinkDetailsAPI: PropTypes.func.isRequired,
  addToInProgress: PropTypes.func.isRequired,
  addToDone: PropTypes.func.isRequired,
  drinkDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  inProgressRecipes: PropTypes.objectOf(PropTypes.string, PropTypes.array)
    .isRequired,
};
