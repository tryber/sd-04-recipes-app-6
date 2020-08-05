import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getFoodDetails } from '../redux/actions/foodDetails';
import { useParams } from 'react-router-dom';

const FoodDetails = ({ getFoodDetailsProps, foodInfo }) => {
  // const { id } = useParams();
  const id = 52882;
  useEffect(() => {
    getFoodDetailsProps(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
  }, []);
  const getNumberOfIngredients = () => {
    let ingredientsNumber = [];
    if (foodInfo.length > 0) {
      ingredientsNumber = Object.keys(foodInfo[0]).filter((key) =>
        key.includes('strIngredient')
      );
    }
    return ingredientsNumber;
  };
  return (
    <div>
      <h3 data-testid="recipe-title" className="details-name">
        {foodInfo.strMeal}
      </h3>
      <h4 data-testid="recipe-category">{foodInfo.strCategory}</h4>
      {/* {console.log(
        getNumberOfIngredients().filter(
          (ingredientKey) => foodInfo[ingredientKey] !== ''
        )
      )} */}
      <img
        data-testid="recipe-photo"
        className="details-img"
        // alt={data.name}
        // src={data.image}
      />
      <div></div>
    </div>
  );
};

const mapState = (state) => ({
  foodInfo: state.foodDetails.foodInfo,
});

const mapDispatch = {
  getFoodDetailsProps: getFoodDetails,
};

export default connect(mapState, mapDispatch)(FoodDetails);
