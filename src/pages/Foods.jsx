import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';

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
        {dataFoods.map((food, index) => {
          soma += 1;
          if (soma > 12) return <div />;
          return (
            <RecipesCard
              title={food.strMeal}
              srcImagem={food.strMealThumb}
              to="/comidas"
              testImage=""
              testCard={`${index}-card-name`}
            />
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
