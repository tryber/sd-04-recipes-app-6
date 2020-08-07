import React from 'react';
import PropTypes from 'prop-types';

const Ingredients = ({ ingredients, foodOrDrinkData }) => (
  <div>
    <h4>Ingredientes:</h4>
    {ingredients.map((ingredientKey, index) => (
      <p
        data-testid={`${index}-ingredient-name-and-measure`}
        key={
          foodOrDrinkData[ingredientKey] +
          foodOrDrinkData[`strMeasure${index + 1}`]
        }
      >
        {foodOrDrinkData[ingredientKey]}-
        {foodOrDrinkData[`strMeasure${index + 1}`]}
      </p>
    ))}
  </div>
);

export default Ingredients;

Ingredients.propTypes = {
  ingredients: PropTypes.func.isRequired,
  foodOrDrinkData: PropTypes.objectOf(PropTypes.string).isRequired,
};
