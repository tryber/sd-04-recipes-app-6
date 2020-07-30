import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

// import {
//   Login,
//   Foods,
//   Drinks,
//   FoodsDetail,
//   DrinkDetail,
//   FoodsProcess,
//   DrinkProcess,
//   Explore,
//   ExploreFood,
//   ExploreDrink,
//   FoodIngredients,
//   DrinkIngredients,
//   FoodArea,
//   Profile,
//   CookedRecipes,
//   FavoriteRecipes,
// } from './pages';


function App() {
  return (
    <div id="meals">
      <Login />
    </div>
  );
}

export default App;
