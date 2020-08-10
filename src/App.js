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

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/comidas/:id/in-progress" component={FoodsInProgress} />
        <Route path="/bebidas/:id/in-progress" component={DrinksInProgress} />
        <Route path="/comidas/:id" component={FoodDetails} />
        <Route path="/bebidas/:id" component={DrinkDetails} />
        <Route path="/comidas" component={Foods} />
        <Route path="/bebidas" component={Drinks} />
        <Route exact path="/" component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
