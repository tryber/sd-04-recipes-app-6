import { combineReducers } from 'redux';
import foodsOrDrinks from './recipesFoodsOrDrinks';
import foodDetails from './foodDetails';
import drinkDetails from './drinkDetails';
import recommendations from './recommendations';
import recipesProgress from './recipesProgress';

export default combineReducers({
  foodsOrDrinks,
  foodDetails,
  drinkDetails,
  recommendations,
  recipesProgress,
});
