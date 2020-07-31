import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
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
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
