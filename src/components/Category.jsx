import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory } from '../redux/actions/category';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import recipesPagination from '../services/recipesPagination';
import Button from './Button';

function onClick(event, getFoods, filterCategory, setFilterCategory) {
  const { innerText } = event.target;
  const newCategory = innerText === filterCategory || innerText === 'All' ? '' : innerText;
  const url =
    newCategory === ''
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${newCategory}`;

  setFilterCategory(newCategory);
  // getFoods(url).then((data) => (data));
}

function Category({ getCategories, categories, getFoods }) {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  useEffect(() => {
    getCategories(url);
  }, []);

  const [filterCategory, setFilterCategory] = useState('');

  return (
    <div>
      {categories &&
        recipesPagination(categories.meals, 0, 5).map((el) => {
          return (
            <Button
              onClick={(event) => {
                onClick(event, getFoods, filterCategory, setFilterCategory);
              }}
              key={el.strCategory}
            >
              {el.strCategory}
            </Button>
          );
        })}
      <Button
        onClick={(event) => {
          onClick(event, getFoods, filterCategory, setFilterCategory);
        }}
      >
        {'All'}
      </Button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories.recipesCategories,
});

const mapDispatchToProps = {
  getCategories: getCategory,
  getFoods: getFoodsAndDrinks,
};

Category.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    strCategory: PropTypes.string,
    meal: PropTypes.string,
  }).isRequired,
  getFoods: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
