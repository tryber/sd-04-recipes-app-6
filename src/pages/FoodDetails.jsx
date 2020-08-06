import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodDetails } from '../redux/actions/foodDetails';

const FoodDetails = ({ getFoodDetailsProps, foodInfo }) => {
  // const { id } = useParams();
  const id = 52882;
  useEffect(() => {
    getFoodDetailsProps(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
  }, []);
  const getNumberOfIngredients = () => {
    const ingredientsNumber = Object.keys(foodInfo).filter((key) =>
      key.includes('strIngredient'),
    );

    return ingredientsNumber;
  };
  if (Object.keys(foodInfo).length > 0) {
    return (
      <div>
        <h3 data-testid="recipe-title" className="details-name">
          {foodInfo.strMeal}
        </h3>
        <h4 data-testid="recipe-category">{foodInfo.strCategory}</h4>

        {getNumberOfIngredients().map((ingredientKey, index) => {
          if (foodInfo[ingredientKey] !== '') {
            return (
              <p data-testid={`${index}-ingredient-name-and-measure`}>
                {foodInfo[ingredientKey]}
                -
                {foodInfo[`strMeasure${index + 1}`]}
              </p>
            );
          }
          return null;
        })}
        <p data-testid="instructions">{foodInfo.strInstructions}</p>
      </div>
    );
  }
  return <div>oi</div>;
};

const mapState = (state) => ({
  foodInfo: state.foodDetails.foodInfo,
});

const mapDispatch = {
  getFoodDetailsProps: getFoodDetails,
};

export default connect(mapState, mapDispatch)(FoodDetails);

FoodDetails.propTypes = {
  getFoodDetailsProps: PropTypes.func.isRequired,
  foodInfo: PropTypes.string.isRequired,
};
