import { combineReducers } from 'redux';
import foodsOrDrinks from './recipesFoodsOrDrinks';
import foodDetails from './foodDetails';

export default combineReducers({ foodsOrDrinks, foodDetails });
