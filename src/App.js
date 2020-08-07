/* eslint-disable react/jsx-fragments */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Header from './components/Header';
import FoodDetails from './pages/FoodDetails';
import Drinks from './pages/Drinks';
import Foods from './pages/Foods';
import FoodsInProgress from './pages/FoodsInProgress';
import DrinkDetails from './pages/DrinkDetails';

function App() {
  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/comidas/:id/in-progress" component={FoodsInProgress} />
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
