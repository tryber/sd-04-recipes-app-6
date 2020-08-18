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
        <Route exact path="/" component={Login} />
        <Route exact path="/explorar/comidas" component={ExploreFood} />
        <Route exact path="/explorar/bebidas/ingredientes" component={ExploreDrinkIngredients} />
        <Route exact path="/explorar/bebidas" component={ExploreDrink} />
        <Route exact path="/explorar/comidas/ingredientes" component={ExploreFoodIngredients} />
        <Route exact path="/explorar/comidas/area" component={ExploreFoodArea} />
        <Route exact path="/explorar" component={Explore} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
