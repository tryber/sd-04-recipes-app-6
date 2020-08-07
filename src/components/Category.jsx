import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
  console.log(filterCategory);

  setFilterCategory(newCategory);
  console.log(filterCategory);
  getFoods(url).then((data) => console.log(data));
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
              children={el.strCategory}
              onClick={(event) => {
                onClick(event, getFoods, filterCategory, setFilterCategory);
              }}
              key={el.strCategory}
            />
          );
        })}
      <Button
        children="All"
        onClick={(event) => {
          onClick(event, getFoods, filterCategory, setFilterCategory);
        }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Category);
