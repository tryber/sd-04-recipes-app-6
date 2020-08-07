import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory } from '../redux/actions/category';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import recipesPagination from '../services/recipesPagination';
import Button from './Button';

const Categories = ({
  urlFoodsOrDrinks,
  getCategories,
  categories,
  getFoods,
  urlCategory,
  urlFilterCategory,
  isPageFood,
}) => {
  useEffect(() => {
    getCategories(urlCategory);
  }, []);

  const [filterCategory, setFilterCategory] = useState('');
  function changeCategories(event) {
    const { innerText } = event.target;
    const newCategory = innerText === filterCategory || innerText === 'All' ? '' : innerText;
    const urlSearch = newCategory === '' ? urlFoodsOrDrinks : `${urlFilterCategory}${newCategory}`;

    setFilterCategory(newCategory);
    getFoods(urlSearch).then((data) => data);
  }
  if (categories === null) return <div />;
  const listCategories = isPageFood ? categories.meals : categories.drinks;

  return (
    <div>
      {categories &&
        recipesPagination(listCategories, 0, 5).map((el) => (
          <Button
            onClick={(event) => {
              changeCategories(event);
            }}
            key={el.strCategory}
          >
            {el.strCategory}
          </Button>
        ))}
      <Button
        onClick={(event) => {
          changeCategories(event);
        }}
      >
        {'All'}
      </Button>
    </div>
  );
};

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
  urlFoodsOrDrinks: PropTypes.string.isRequired,
  urlCategory: PropTypes.string.isRequired,
  isPagaeFood: PropTypes.bool.isRequired,
  urlFilterCategory: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
