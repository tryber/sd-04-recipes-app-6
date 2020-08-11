import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addInProgressDrink } from '../redux/actions/recipesProgress';
import FoodRecommendations from '../components/FoodDetailsComponents/FoodRecommendations';
import Instructions from '../components/FoodDetailsComponents/Instructions';
import Ingredients from '../components/FoodDetailsComponents/Ingredients';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodDetailsComponents/TitleAndButtons';
import { getDetails } from '../redux/actions/foodOrDrinkDetails';
import { updateLocalStorage, getLocalStorage, checkInProgress } from '../services/localStorage';

const FoodDetails = ({ getDrinkDetailsAPI, drinkInfo, addToInProgress }) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    getDrinkDetailsAPI(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
  }, []);
  const getIngredients = () => {
    const ingredientsNumber = Object.keys(drinkInfo).filter((key) =>
      key.includes('strIngredient'),
    );
    const ingredientsKeys = ingredientsNumber.filter(
      (ingredientKey) => drinkInfo[ingredientKey] !== null,
    );
    return ingredientsKeys;
  };

  const getIngredientsArray = () =>
    getIngredients().map((key) => drinkInfo[key]);

  const isDone =
    getLocalStorage('doneRecipes') ||
    [].find((recipe) => recipe.id === drinkInfo.idDrink);

  return (
    <div>
      {drinkInfo && (
        <div className="details-container">
          <Image
            width={`${100}%`}
            test="recipe-photo"
            src={drinkInfo.strDrinkThumb}
            alt={drinkInfo.strDrink}
          />
          <TitleAndButtons
            alcoholicOrNot={drinkInfo.strAlcoholic}
            category={drinkInfo.strCategory}
            id={drinkInfo.idDrink}
            image={drinkInfo.strDrinkThumb}
            title={drinkInfo.strDrink}
            type="bebida"
          />
          <Ingredients
            ingredients={getIngredients()}
            foodOrDrinkData={drinkInfo}
          />
          <Instructions instructions={drinkInfo.strInstructions} />
          <FoodRecommendations />
        </div>
      )}
      {!isDone && (
        <div className="button-container">
          <Button
            onClick={() => {
              addToInProgress(drinkInfo.idDrink, getIngredientsArray());
              history.push(`/bebidas/${drinkInfo.idDrink}/in-progress`);
              updateLocalStorage('cocktails', drinkInfo.idDrink, getIngredientsArray());
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
  drinkInfo: state.foodOrDrinkDetails.details.drinks[0],
});

const mapDispatch = {
  getDrinkDetailsAPI: getDetails,
  addToInProgress: addInProgressDrink,
};

export default connect(mapState, mapDispatch)(FoodDetails);

FoodDetails.propTypes = {
  getDrinkDetailsAPI: PropTypes.func.isRequired,
  addToInProgress: PropTypes.func.isRequired,
  drinkInfo: PropTypes.objectOf(PropTypes.string).isRequired,
};
