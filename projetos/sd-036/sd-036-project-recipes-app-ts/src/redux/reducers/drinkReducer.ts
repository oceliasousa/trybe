import { AnyAction } from 'redux';
import { GET_DRINKS } from '../actions/actionMealsAndDrinks';
import { DrinksType } from '../../types';

const INITIAL_VALUE = {
  drinks: [],
};

const drinksReducer = (state = INITIAL_VALUE, action: AnyAction) => {
  switch (action.type) {
    case GET_DRINKS:
      return {
        ...state,
        drinks: action.payload as DrinksType[],
      };
    default:
      return state;
  }
};

export default drinksReducer;
