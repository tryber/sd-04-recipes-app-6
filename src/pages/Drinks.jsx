import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';

function Drinks({ recipesDrinks, dataDrinks }) {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    recipesDrinks(url);
  }, []);

  if (dataDrinks !== undefined) {
    return (
      <div>
        <h1>Tela Principal Bebidas</h1>
        {dataDrinks.map((drink) => (
          <div>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
            <h1>{drink.strDrink}</h1>
          </div>
        ))}
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
