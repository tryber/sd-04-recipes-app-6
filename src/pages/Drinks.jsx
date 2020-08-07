import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';
import Categories from '../components/Category';
import Footer from '../components/Footer';
import recipesPagination from '../services/recipesPagination';
import Button from '../components/Button';

function Drinks({ recipesDrinks, dataDrinks }) {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(12);

  useEffect(() => {
    recipesDrinks(url);
  }, []);

  if (dataDrinks !== undefined) {
    return (
      <div>
        <h1>Tela Principal Bebidas</h1>
        <Categories
          urlFoodsOrDrinks={url}
          urlFilterCategory='https://www.thecocktaildb.com/api/json/v1/1/filter.php?c='
          urlCategory='https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
          isPageFood={false}
        />
        {recipesPagination(dataDrinks, startPage, endPage).map(
          (drink, index) => (
            <RecipesCard
              key={drink.strDrink}
              title={drink.strDrink}
              srcImagem={drink.strDrinkThumb}
              to={`/bebidas/${drink.idDrink}`}
              testImage={`${index}-card-img`}
              testName={`${index}-card-name`}
              testCard={`${index}-recipe-card`}
            />
          )
        )}
        <Button
          onClick={() => {
            setStartPage(startPage + 12);
            setEndPage(endPage + 12);
          }}
        >
          Proximo
        </Button>
        <Footer />;
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
