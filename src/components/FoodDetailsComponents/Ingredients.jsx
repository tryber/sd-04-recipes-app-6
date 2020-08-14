/* eslint-disable react/jsx-fragments */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../Input';
import '../../styles/InProgress.css';
import {
  updateIngredientsLocal,
  checkIngredientLocal,
} from '../../services/localStorage';
import { updateInProgress } from '../../redux/actions/recipesProgress';

const Ingredients = ({
  id,
  type,
  ingredients,
  foodOrDrinkData,
  checkbox = false,
  updateFoodInProgress,
}) => (
  <div>
    <h4>Ingredientes:</h4>
    {!checkbox &&
      ingredients.map((ingredientKey, index) => (
        <p
          data-testid={`${index}-ingredient-name-and-measure`}
          key={foodOrDrinkData[ingredientKey]}
        >
          {foodOrDrinkData[ingredientKey]} -{' '}
          {foodOrDrinkData[`strMeasure${index + 1}`]}
        </p>
      ))}
    {checkbox && (
      <div className="ingredients">
        {ingredients.map((ingredientKey, index) => (
          <div
            data-testid={`${index}-ingredient-step`}
            key={ingredientKey}
            className="input-label"
          >
            <Input
              onChange={() => {
                updateIngredientsLocal(
                  foodOrDrinkData[id],
                  type,
                  foodOrDrinkData[ingredientKey]
                );
                updateFoodInProgress(
                  foodOrDrinkData[id],
                  type,
                  foodOrDrinkData[ingredientKey]
                );
              }}
              defaultChecked={
                !checkIngredientLocal(
                  foodOrDrinkData[id],
                  type,
                  foodOrDrinkData[ingredientKey]
                )
              }
              type="checkbox"
              id={`ingredient-${index}`}
            />
            <label className="checkbox" htmlFor={`ingredient-${index}`}>
              {foodOrDrinkData[ingredientKey]} -{' '}
              {foodOrDrinkData[`strMeasure${index + 1}`]}
            </label>
          </div>
        ))}
      </div>
    )}
  </div>
);

const mapDispatch = {
  updateFoodInProgress: updateInProgress,
};

export default connect(null, mapDispatch)(Ingredients);

Ingredients.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checkbox: PropTypes.bool.isRequired,
  ingredients: PropTypes.func.isRequired,
  updateFoodInProgress: PropTypes.func.isRequired,
  foodOrDrinkData: PropTypes.objectOf(PropTypes.string).isRequired,
};
