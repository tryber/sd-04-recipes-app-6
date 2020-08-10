import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategory } from '../redux/actions/category';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import recipesPagination from '../services/recipesPagination';
import Button from './Button';
import '../styles/TelaPrincipal.css';

function newCategory(innerText, filterCategory) {
  const category = innerText === filterCategory || innerText === 'All' ? '' : innerText;
  return category;
}

function urlSearch(urlFoodsOrDrinks, urlFilterCategory, innerText, filterCategory) {
  const url =
    newCategory(innerText, filterCategory) === ''
      ? urlFoodsOrDrinks
      : `${urlFilterCategory}${newCategory(innerText, filterCategory)}`;
  return url;
}

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

    setFilterCategory(newCategory(innerText, filterCategory));
    getFoods(urlSearch(urlFoodsOrDrinks, urlFilterCategory, innerText, filterCategory)).then(
      (data) => data,
    );
  }
  if (categories === null) return <div />;
  const listCategories = isPageFood ? categories.meals : categories.drinks;

  return (
    <div>
      {listCategories &&
        recipesPagination(listCategories, 0, 5).map((el) => (
          <Button
            className={'button'}
            test={`${el.strCategory}-category-filter`}
            onClick={(event) => {
              changeCategories(event);
            }}
            key={el.strCategory}
          >
            {el.strCategory}
          </Button>
        ))}
      <Button
        className={'button'}
        test="All-category-filter"
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
    meals: PropTypes.string,
    drinks: PropTypes.string,
  }).isRequired,
  getFoods: PropTypes.func.isRequired,
  urlFoodsOrDrinks: PropTypes.string.isRequired,
  urlCategory: PropTypes.string.isRequired,
  isPageFood: PropTypes.bool.isRequired,
  urlFilterCategory: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
