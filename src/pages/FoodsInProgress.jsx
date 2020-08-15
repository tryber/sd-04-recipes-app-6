/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDetails } from '../redux/actions/foodOrDrinkDetails';
import { addDoneFoodRecipe, addInProgressFood } from '../redux/actions/recipesProgress';
import Ingredients from '../components/FoodOrDrinkDetailsComponents/Ingredients';
import Button from '../components/Button';
import Image from '../components/Image';
import '../styles/FoodDetails.css';
import TitleAndButtons from '../components/FoodOrDrinkDetailsComponents/TitleAndButtons';
import Instructions from '../components/FoodOrDrinkDetailsComponents/Instructions';
import { updateLocalStorage, getLocalStorage } from '../services/localStorage';
import getIngredients from '../services/getIngredients';

const FoodsInProgress = ({
  getFoodDetailsAPI,
  addToInProgress,
  foodDetails,
  addToDone,
  inProgressRecipes,
}) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    if (!foodDetails) {
      getFoodDetailsAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, []);

  // adicionei esse useEffect pq o teste estava entrando nessa rota sem antes iniciar a receita
  // na rota anterior, então agora, ao montar o componente, a comida é adicionanda automaticamente
  // ao status de em progresso
  useEffect(() => {
    const getInProgress = getLocalStorage('inProgressRecipes');
    if (foodDetails && (!getInProgress || (getInProgress && !getInProgress.meals[id]))) {
      const getIngredientsArray = () => getIngredients(foodDetails).map((key) => foodDetails[key]);
      updateLocalStorage('meals', id, getIngredientsArray());
      addToInProgress(id, getIngredientsArray());
    }
  }, [foodDetails]);

  const getDoneObj = () => {
    if (foodDetails) {
      return {
        id: foodDetails.idMeal,
        type: 'comida',
        area: foodDetails.strArea,
        category: foodDetails.strCategory,
        alcoholicOrNot: '',
        name: foodDetails.strMeal,
        image: foodDetails.strMealThumb,
        doneDate: new Date().toLocaleDateString(),
        tags: foodDetails.strTags,
      };
    }
    return true;
  };

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
            type="meals"
            id="idMeal"
            checkbox
            ingredients={getIngredients(foodDetails)}
            foodOrDrinkData={foodDetails}
          />
          <Instructions instructions={foodDetails.strInstructions} />
        </div>
      )}
      <div className="button-container">
        <Button
          onClick={() => {
            addToDone(getDoneObj());
            history.push('/receitas-feitas');
          }}
          disabled={inProgressRecipes.meals && inProgressRecipes.meals[id].length > 0}
          test="finish-recipe-btn"
        >
          Finalizar Receita
        </Button>
      </div>
    </div>
  );
};

const mapState = (state) => ({
  foodDetails: state.foodOrDrinkDetails.details.meals[0],
  inProgressRecipes: state.recipesProgress.inProgressRecipes,
});

const mapDispatch = {
  getFoodDetailsAPI: getDetails,
  addToInProgress: addInProgressFood,
  addToDone: addDoneFoodRecipe,
};

export default connect(mapState, mapDispatch)(FoodsInProgress);

FoodsInProgress.propTypes = {
  addToInProgress: PropTypes.func.isRequired,
  getFoodDetailsAPI: PropTypes.func.isRequired,
  addToDone: PropTypes.func.isRequired,
  foodDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  inProgressRecipes: PropTypes.objectOf(PropTypes.string, PropTypes.array)
    .isRequired,
};
