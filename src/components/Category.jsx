import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCategory } from '../redux/actions/category'
import recipesPagination from '../services/recipesPagination';
import Button from './Button';

function Category({ getCategories, categories }){
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  useEffect(() => {
    getCategories(url);
  }, [])
    return (
      <div>
        {categories && recipesPagination(categories.meals, 0, 5).map((el) => {
          return <Button >{el.strCategory}</Button>
        })}
      </div>
    )
}

const mapStateToProps = (state) => ({
  categories: state.categories.recipesCategories,
});

const mapDispatchToProps = {
  getCategories: getCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
