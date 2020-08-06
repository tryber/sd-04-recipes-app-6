import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';
import recipesPagination from '../services/recipesPagination';

function Foods({ recipesFoods, dataFoods }) {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(11);

  useEffect(() => {
    recipesFoods(url);
  }, []);

  let soma = 0;
  if (dataFoods !== undefined) {
    return (
      <div>
        <h1>Tela Principal Comidas</h1>
        {recipesPagination(dataFoods, startPage, endPage).map((food, index) => {
          return (
            <RecipesCard
              title={food.strMeal}
              srcImagem={food.strMealThumb}
              to={`/comidas/${food.idMeal}`}
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
