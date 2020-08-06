import { combineReducers } from 'redux';
import foodsOrDrinks from './recipesFoodsOrDrinks';
import foodDetails from './foodDetails';
<<<<<<< HEAD
import categories from './category';
export default combineReducers({ foodsOrDrinks, foodDetails, categories });
=======
import recommendations from './recommendations';

export default combineReducers({ foodsOrDrinks, foodDetails, recommendations });
>>>>>>> 1d90496e1a6aeb55d0923e956421cb0704bc8617
