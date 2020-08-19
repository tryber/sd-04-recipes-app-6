import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getArea } from '../redux/actions/area';
import { getFoodsAndDrinks } from '../redux/actions/foodAndDrinks';
import '../styles/TelaPrincipal.css';

const FoodArea = ({ getArea, area, loadingArea, recipesFoods, dataFoods }) => {
  const [tempArea, setArea] = useState('All')
  useEffect(() => {
    getArea('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    if(tempArea !== 'All') {recipesFoods(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${tempArea}`)}
    if(tempArea === 'All') {recipesFoods('https://www.themealdb.com/api/json/v1/1/search.php?s=')}
    
  }, [tempArea]);
  return (
    <div>
      {loadingArea && <h3>...carregando</h3>}
      {area && dataFoods &&(
        <select onChange={(event)=> setArea(event.target.value)}>
          <option key='0' >All</option>
          {area.meals.map((regioes,index) => 
             <option key={index + 1}>{regioes.strArea}</option>
          )}
        </select>
      )}
      {dataFoods && (dataFoods.map((element,index) => { return <p key={index}>{element.strMeal}</p>}))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  area: state.area.area,
  loadingArea: state.area.isLoading,
  dataFoods: state.foodsOrDrinks.recipes.meals,
});

const mapDispatchToProps = {
  getArea: getArea,
  recipesFoods: getFoodsAndDrinks,
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodArea);