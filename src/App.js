/* eslint-disable react/jsx-fragments */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import FoodDetails from './pages/FoodDetails';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinksInProgress from './pages/DrinksInProgress';
import DrinkDetails from './pages/DrinkDetails';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodArea from './pages/ExploreFoodArea';
import CookedRecipes from './pages/CookedRecipes';
import FoodArea from './pages/FoodArea';
import Profile from './pages/Profile';
import UserProvider from './context/UserContext';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/comidas/:id/in-progress" component={FoodsInProgress} />
        <Route exact path="/bebidas/:id/in-progress" component={DrinksInProgress} />
        <Route exact path="/comidas/:id" component={FoodDetails} />
        <Route exact path="/bebidas/:id" component={DrinkDetails} />
        <Route exact path="/comidas" component={Foods} />
        <Route exact path="/bebidas" component={Drinks} />
        <Route exact path="/explorar/comidas" component={ExploreFood} />
        <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinkIngredients} />
        <Route exact path="/explorar/bebidas" component={ExploreDrink} />
        <Route exact path="/explorar/comidas/ingredientes" component={ExploreFoodIngredients} />
        <Route exact path="/explorar/comidas/area" component={ExploreFoodArea} />
        <Route exact path="/explorar" component={Explore} />
        <Route path="/receitas-feitas" component={CookedRecipes} />
        <Route path="/comidas/:id/in-progress" component={FoodsInProgress} />
        <Route path="/bebidas/:id/in-progress" component={DrinksInProgress} />
        <Route path="/comidas/:id" component={FoodDetails} />
        <Route path="/bebidas/:id" component={DrinkDetails} />
        <Route path="/comidas" component={Foods} />
        <Route path="/bebidas" component={Drinks} />
        <Route path="/explorar/comidas/area" component={FoodArea} />
        <Route path="/receitas-favoritas" component={FavoriteRecipes} />
        <Route path="/receitas-favoritas" component={FavoriteRecipes} />
        <UserProvider>
          <Route exact path="/perfil" component={Profile} />
          <Route exact path="/" component={Login} />
        </UserProvider>
      </Switch>
    </React.Fragment>
  );
}

export default App;
