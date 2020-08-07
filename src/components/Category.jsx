import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory } from '../redux/actions/category';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import recipesPagination from '../services/recipesPagination';
import Button from './Button';

function onClick(
  event,
  getFoods,
  filterCategory,
  setFilterCategory,
  urlFoodsOrDrinks,
  urlFilterCategory,
) {
  const { innerText } = event.target;
  const newCategory = innerText === filterCategory || innerText === 'All' ? '' : innerText;
  const urlSearch = newCategory === '' ? urlFoodsOrDrinks : `${urlFilterCategory}${newCategory}`;

  setFilterCategory(newCategory);
  getFoods(urlSearch).then((data) => data);
}

function Categories({
  urlFoodsOrDrinks,
  getCategories,
  categories,
  getFoods,
  urlCategory,
  urlFilterCategory,
}) {
  useEffect(() => {
    getCategories(urlCategory);
  }, []);

  const [filterCategory, setFilterCategory] = useState('');

  return (
    <div>
      {categories &&
        recipesPagination(categories.meals, 0, 5).map((el) => (
          <Button
            onClick={(event) => {
              onClick(
                event,
                getFoods,
                filterCategory,
                setFilterCategory,
                urlFoodsOrDrinks,
                urlFilterCategory,
              );
            }}
            key={el.strCategory}
          >
            {el.strCategory}
          </Button>
        ))}
      <Button
        onClick={(event) => {
          onClick(
            event,
            getFoods,
            filterCategory,
            setFilterCategory,
            urlFoodsOrDrinks,
            urlFilterCategory,
          );
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

Categories.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    strCategory: PropTypes.string,
    meal: PropTypes.string,
  }).isRequired,
  getFoods: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
