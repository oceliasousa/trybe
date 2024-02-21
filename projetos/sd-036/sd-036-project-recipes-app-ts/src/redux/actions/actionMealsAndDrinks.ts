import { DrinksType, MealsType } from '../../types';

export const GET_MEALS = 'GET_MEALS';

export const getMeals = (meals: MealsType[] | undefined) => ({
  type: GET_MEALS,
  payload: meals,
});

export const GET_DRINKS = 'GET_DRINKS';

export const getDrinks = (drinks: DrinksType[] | undefined) => ({
  type: GET_DRINKS,
  payload: drinks,
});
