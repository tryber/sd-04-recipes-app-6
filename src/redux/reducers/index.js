import { combineReducers } from 'redux';
import foodsOrDrinks from './recipesFoodsOrDrinks';
import foodOrDrinkDetails from './foodOrDrinkDetails';
import categories from './category';
import recommendations from './recommendations';
import recipesProgress from './recipesProgress';

export default combineReducers({
  foodsOrDrinks,
  foodOrDrinkDetails,
  categories,
  recommendations,
  recipesProgress,
});
