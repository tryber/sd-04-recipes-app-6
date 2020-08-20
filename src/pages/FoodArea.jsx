import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getArea } from '../redux/actions/area';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import RecipesCard from '../components/RecipesCard';
import recipesPagination from '../services/recipesPagination';
import '../styles/TelaPrincipal.css';
import Header from '../components/Header';

const FoodArea = ({ areaAPI, area, loadingArea, recipesFoods, dataFoods }) => {
  const [tempArea, setArea] = useState('All');
  useEffect(() => {
    areaAPI('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    if (tempArea !== 'All') {
      recipesFoods(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${tempArea}`,
      );
    }
    if (tempArea === 'All') {
      recipesFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
  }, [tempArea]);
  return (
    <div>
      <Header isSearchActive={false} title="AREA" />
      {loadingArea && <h3>...carregando</h3>}
      {area && dataFoods && (
        <div>
          <select
            data-testid="explore-by-area-dropdown"
            onChange={(event) => setArea(event.target.value)}
          >
            <option key="All" data-testid="All-option">
              All
            </option>
            {area.meals.map((regioes) => (
              <option key={regioes.strArea} data-testid={`${regioes.strArea}-option`}>
                {regioes.strArea}
              </option>
            ))}
          </select>
          <div className="list">
            {recipesPagination(dataFoods, 0, 12).map((food, index) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  area: state.area.area,
  loadingArea: state.area.isLoading,
  dataFoods: state.foodsOrDrinks.recipes.meals,
});

const mapDispatchToProps = {
  areaAPI: getArea,
  recipesFoods: getFoodsAndDrinks,
};

FoodArea.propTypes = {
  area: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingArea: PropTypes.bool.isRequired,
  areaAPI: PropTypes.func.isRequired,
  recipesFoods: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodArea);
