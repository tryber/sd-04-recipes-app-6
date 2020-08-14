/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDetails } from '../redux/actions/foodOrDrinkDetails';
import {
  addInProgressDrink,
  addDoneDrinkRecipe,
} from '../redux/actions/recipesProgress';
import Ingredients from '../components/FoodOrDrinkDetailsComponents/Ingredients';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodOrDrinkDetailsComponents/TitleAndButtons';
import { getLocalStorage, updateLocalStorage } from '../services/localStorage';
import Instructions from '../components/FoodOrDrinkDetailsComponents/Instructions';
import getIngredients from '../services/getIngredients';

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
      getDrinkDetailsAPI(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
    }
  }, []);

  useEffect(() => {
    const getInProgress = getLocalStorage('inProgressRecipes');
    if (
      drinkDetails &&
      (!getInProgress || (getInProgress && !getInProgress.cocktails[id]))
    ) {
      const getIngredientsArray = () =>
        getIngredients(drinkDetails).map((key) => drinkDetails[key]);
      updateLocalStorage('cocktails', id, getIngredientsArray());
      addToInProgress(id, getIngredientsArray());
    }
  }, [drinkDetails]);

  const getDoneObj = () => {
    if (drinkDetails) {
      return {
        id: drinkDetails.idDrink,
        type: 'bebida',
        area: drinkDetails.strArea,
        category: drinkDetails.strCategory,
        alcoholicOrNot: drinkDetails.strAlcoholic,
        name: drinkDetails.strDrink,
        image: drinkDetails.strDrinkThumb,
        doneDate: new Date().toLocaleDateString(),
        tags: drinkDetails.strTags,
      };
    }
    return true;
  };

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
            ingredients={getIngredients(drinkDetails)}
            foodOrDrinkData={drinkDetails}
          />
          <Instructions instructions={drinkDetails.strInstructions} />
        </div>
      )}
      <div className="button-container">
        <Button
          onClick={() => {
            addToDone(getDoneObj());
            history.push('/receitas-feitas');
          }}
          disabled={
            inProgressRecipes.cocktails &&
            inProgressRecipes.cocktails[id].length > 0
          }
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
  addToDone: addDoneDrinkRecipe,
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
