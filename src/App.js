import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Header from './components/Header';
import FoodDetails from './pages/FoodDetails';

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
    <>
      <Header />
      <Switch>
        <Route path="/comidas/:id" component={FoodDetails} />
        <Route exact path="/" component={Login} />
      </Switch>
    </>
  );
}

export default App;
