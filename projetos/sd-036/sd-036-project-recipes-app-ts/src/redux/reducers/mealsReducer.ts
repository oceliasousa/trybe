import { AnyAction } from 'redux';
import { GET_MEALS } from '../actions/actionMealsAndDrinks';
import { MealsType } from '../../types';

const INITIAL_VALUE = {
  meals: [],
};

const mealsReducer = (state = INITIAL_VALUE, action: AnyAction) => {
  switch (action.type) {
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload as MealsType[],
      };
    default:
      return state;
  }
};

export default mealsReducer;
