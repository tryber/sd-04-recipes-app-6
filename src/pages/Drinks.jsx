/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';
import Categories from '../components/Category';
import Footer from '../components/Footer';
import recipesPagination from '../services/recipesPagination';
import Button from '../components/Button';
import Header from '../components/Header';
import '../styles/Foods.css';
import '../styles/TelaPrincipal.css';

function Drinks({ recipesDrinks, dataDrinks, isLoading }) {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(12);

  useEffect(() => {
    recipesDrinks(url);
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (dataDrinks && dataDrinks.length === 1) {
      return history.push(`/bebidas/${dataDrinks[0].idDrink}`);
    }
    if (dataDrinks === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    return console.log('CC -> olhar isso depois');
  }, [dataDrinks]);

  return (
    <div className="centralizar">
      <Header isSearchActive title="Bebidas" />
      <div className="container">
        {isLoading && <h3>Carregando...</h3>}
        {dataDrinks && dataDrinks.length > 0 && (
          <div>
            <Categories
              urlFoodsOrDrinks={url}
              urlFilterCategory="https://www.thecocktaildb.com/api/json/v1/1/filter.php?c="
              urlCategory="https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
              isPageFood={false}
            />
            <div className="list">
              {recipesPagination(dataDrinks, startPage, endPage).map(
                (drink, index) => (
                  <div className="cardBorder">
                    <RecipesCard
                      key={drink.strDrink}
                      title={drink.strDrink}
                      srcImagem={drink.strDrinkThumb}
                      to={`/bebidas/${drink.idDrink}`}
                      testImage={`${index}-card-img`}
                      testName={`${index}-card-name`}
                      testCard={`${index}-recipe-card`}
                    />
                  </div>
                ),
              )}
            </div>
            <Button
              onClick={() => {
                setStartPage(startPage + 12);
                setEndPage(endPage + 12);
              }}
            >
              Proximo
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataDrinks: state.foodsOrDrinks.recipes.drinks,
  isLoading: state.foodsOrDrinks.isLoading,
});

const mapDispatchToProps = {
  recipesDrinks: getFoodsAndDrinks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

Drinks.propTypes = {
  recipesDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
