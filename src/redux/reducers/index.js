import { combineReducers } from 'redux';
import foodsOrDrinks from './recipesFoodsOrDrinks';
import foodDetails from './foodDetails';
import categories from './category';
export default combineReducers({ foodsOrDrinks, foodDetails, categories });
