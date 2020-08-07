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
import { getDrinkDetails } from '../redux/actions/drinkDetails';

const FoodDetails = ({
  getDrinkDetailsAPI,
  drinkInfo,
  doneRecipes,
  inProgressDrinkRecipes,
  addToInProgress,
}) => {
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

  const isDone = doneRecipes.find((recipe) => recipe.id === drinkInfo.idDrink);
  const inProgress = inProgressDrinkRecipes.find(
    (recipeObj) => Object.keys(recipeObj)[0] === drinkInfo.idDrink,
  );

  return (
    <div>
      {Object.keys(drinkInfo).length > 0 && (
        <div className="details-container">
          <Image
            width={`${100}%`}
            test="recipe-photo"
            src={drinkInfo.strDrinkThumb}
            alt={drinkInfo.strDrink}
          />
          <TitleAndButtons
            title={drinkInfo.strDrink}
            category={drinkInfo.strCategory}
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
  drinkInfo: state.drinkDetails.drinkInfo,
  doneRecipes: state.recipesProgress.doneRecipes,
  inProgressDrinkRecipes: state.recipesProgress.inProgressDrinkRecipes,
});

const mapDispatch = {
  getDrinkDetailsAPI: getDrinkDetails,
  addToInProgress: addInProgressDrink,
};

export default connect(mapState, mapDispatch)(FoodDetails);

FoodDetails.propTypes = {
  getDrinkDetailsAPI: PropTypes.func.isRequired,
  addToInProgress: PropTypes.func.isRequired,
  drinkInfo: PropTypes.objectOf(PropTypes.string).isRequired,
  doneRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  inProgressDrinkRecipes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
