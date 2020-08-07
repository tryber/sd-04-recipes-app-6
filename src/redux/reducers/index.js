import { combineReducers } from 'redux';
import foodsOrDrinks from './recipesFoodsOrDrinks';
import foodDetails from './foodDetails';
import categories from './category';
import recommendations from './recommendations';

export default combineReducers({ foodsOrDrinks, foodDetails, recommendations, categories });
