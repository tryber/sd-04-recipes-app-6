import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';

function Foods({ recipesFoods, dataFoods }) {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    recipesFoods(url);
  }, []);
  console.log(dataFoods);

  if (dataFoods !== undefined) {
    return (
      <div>
        <h1>Tela Principal Comidas</h1>
        {dataFoods.map((food) => (
          <div>
            <img src={food.strMealThumb} />
            <h1>{food.strMeal}</h1>
          </div>
        ))}
      </div>
    );
  }
  return <div />;
}

const mapStateToProps = (state) => ({
  dataFoods: state.foodsOrDrinks.recipes.meals,
});

const mapDispatchToProps = {
  recipesFoods: getFoodsAndDrinks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);
