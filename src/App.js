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
import CookedRecipes from './pages/CookedRecipes';
import Profile from './pages/Profile';
import UserProvider from './context/UserContext';


function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/receitas-feitas" component={CookedRecipes} />
        <Route path="/comidas/:id/in-progress" component={FoodsInProgress} />
        <Route path="/bebidas/:id/in-progress" component={DrinksInProgress} />
        <Route path="/comidas/:id" component={FoodDetails} />
        <Route path="/bebidas/:id" component={DrinkDetails} />
        <Route path="/comidas" component={Foods} />
        <Route path="/bebidas" component={Drinks} />
        <UserProvider>
          <Route exact path="/perfil" component={Profile} />
          <Route exact path="/" component={Login} />
        </UserProvider>
      </Switch>
    </React.Fragment>
  );
}

export default App;
