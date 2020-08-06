import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';

function Foods({ recipesFoods, dataFoods }) {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    recipesFoods(url);
  }, []);

  let soma = 0;
  if (dataFoods !== undefined) {
    return (
      <div>
        <h1>Tela Principal Comidas</h1>
        {dataFoods.map((food) => {
          soma += 1;
          if (soma > 12) return <div />;
          return (
            <div>
              <img src={food.strMealThumb} alt={food.strMeal} />
              <h1>{food.strMeal}</h1>
            </div>
          );
        })}
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

Foods.propTypes = {
  recipesFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
};
