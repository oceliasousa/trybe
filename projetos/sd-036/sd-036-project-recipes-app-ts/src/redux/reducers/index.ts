import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import drinksReducer from './drinkReducer';

const rootReducer = combineReducers<any>({
  meals: mealsReducer,
  drinks: drinksReducer,
});

export default rootReducer;
