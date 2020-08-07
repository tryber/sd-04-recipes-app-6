import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';
import recipesPagination from '../services/recipesPagination';

function Drinks({ recipesDrinks, dataDrinks }) {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(11);

  useEffect(() => {
    recipesDrinks(url);
  }, []);

  if (dataDrinks !== undefined) {
    return (
      <div>
        <h1>Tela Principal Bebidas</h1>
        {recipesPagination(dataDrinks, startPage, endPage).map((drink, index) => (
          <RecipesCard
            title={drink.strDrink}
            srcImagem={drink.strDrinkThumb}
            to={`/comidas/${drink.idDrink}`}
            testImage=""
            testCard={`${index}-card-name`}
          />
        ))}

        <button
          onClick={() => {
            setStartPage(startPage + 12);
            setEndPage(endPage + 12);
          }}
        >
          Proximo
        </button>
      </div>
    );
  }
  return <div />;
}

const mapStateToProps = (state) => ({
  dataDrinks: state.foodsOrDrinks.recipes.drinks,
});

const mapDispatchToProps = {
  recipesDrinks: getFoodsAndDrinks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

Drinks.propTypes = {
  recipesDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
