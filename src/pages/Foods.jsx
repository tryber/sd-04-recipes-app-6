import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';
import recipesPagination from '../services/recipesPagination';
import Categories from '../components/Category';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/TelaPrincipal.css';

function Foods({ recipesFoods, dataFoods, isLoading }) {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(12);

  useEffect(() => {
    recipesFoods(url);
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (dataFoods && dataFoods.length === 1 && dataFoods[0].idMeal != 52968) {
      return history.push(`/comidas/${dataFoods[0].idMeal}`);
    }
    if (dataFoods === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
    return console.log('CC -> olhar isso depois');
  }, [dataFoods]);

  return (
    <div className="centralizar">
      <Header isSearchActive title="Comidas" />
      <div className="container">
        {isLoading && <h3>Carregando...</h3>}
        {dataFoods && dataFoods.length !== 0 && (
          <div>
            <Categories
              urlFoodsOrDrinks={url}
              urlFilterCategory="https://www.themealdb.com/api/json/v1/1/filter.php?c="
              urlCategory="https://www.themealdb.com/api/json/v1/1/list.php?c=list"
              isPageFood
            />
            <div className="list">
              {recipesPagination(dataFoods, startPage, endPage).map(
                (food, index) => (
                  <div className="cardBorder">
                    <RecipesCard
                      title={food.strMeal}
                      srcImagem={food.strMealThumb}
                      to={`/comidas/${food.idMeal}`}
                      testImage={`${index}-card-img`}
                      testName={`${index}-card-name`}
                      testCard={`${index}-recipe-card`}
                    />
                  </div>
                ),
              )}
            </div>
            <button
              type="button"
              onClick={() => {
                setStartPage(startPage + 12);
                setEndPage(endPage + 12);
              }}
            >
              Proximo
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataFoods: state.foodsOrDrinks.recipes.meals,
  isLoading: state.foodsOrDrinks.isLoading,
});

const mapDispatchToProps = {
  recipesFoods: getFoodsAndDrinks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Foods);

Foods.propTypes = {
  recipesFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
