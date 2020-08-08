import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';
import recipesPagination from '../services/recipesPagination';
import Categories from '../components/Category';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Foods.css';

function Foods({ recipesFoods, dataFoods, isLoading }) {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(12);

  useEffect(() => {
    recipesFoods(url);
  }, []);

  const history = useHistory();
  useEffect(() => {
    if (dataFoods && dataFoods.length === 1) {
      return history.push(`/comidas/${dataFoods[0].idMeal}`);
    }
    if (dataFoods === null) {
      return alert(
        'Sinto muito, não encontramos nenhuma receita para esses filtros.',
      );
    }
  }, [dataFoods]);

  return (
    <div>
      <Header isSearchActive title="Comidas" />
      <div className="container">
        {isLoading && <h3>Carregando...</h3>}
        {dataFoods && dataFoods.length !== 0 && (
          <>
            <Categories
              urlFoodsOrDrinks={url}
              urlFilterCategory="https://www.themealdb.com/api/json/v1/1/filter.php?c="
              urlCategory="https://www.themealdb.com/api/json/v1/1/list.php?c=list"
              isPageFood
            />
            {recipesPagination(dataFoods, startPage, endPage).map(
              (food, index) => (
                <RecipesCard
                  title={food.strMeal}
                  srcImagem={food.strMealThumb}
                  to={`/comidas/${food.idMeal}`}
                  testImage={`${index}-card-img`}
                  testName={`${index}-card-name`}
                  testCard={`${index}-recipe-card`}
                />
              ),
            )}
            <button
              type="button"
              onClick={() => {
                setStartPage(startPage + 12);
                setEndPage(endPage + 12);
              }}
            >
              Proximo
            </button>
          </>
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
