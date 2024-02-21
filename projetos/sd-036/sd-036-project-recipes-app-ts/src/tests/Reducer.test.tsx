import drinksReducer from '../redux/reducers/drinkReducer';
import { getDrinks, getMeals } from '../redux/actions/actionMealsAndDrinks';
import mealsReducer from '../redux/reducers/mealsReducer';

describe('Testa o reducer de drinks e de meals', () => {
  test('Testa o estado inicial do reducer de drinks', () => {
    expect(drinksReducer(undefined, {} as any)).toEqual({ drinks: [] });
  });

  test('Testa o estado do reducer de drinks após o dispatch da action GET_DRINKS', () => {
    const drinks = [{ idDrink: '1' }, { idDrink: '2' }];
    expect(drinksReducer(undefined, getDrinks(drinks))).toEqual({ drinks });
  });

  test('Testa o comportamento do estado a partir de uma action desconhecida', () => {
    const initialState = { drinks: [] };

    const action = { type: 'UNKNOWN_ACTION_TYPE', payload: {} } as any;
    const newState = drinksReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  test('Testa o estado inicial do reducer de meals', () => {
    expect(mealsReducer(undefined, {} as any)).toEqual({ meals: [] });
  });

  test('Testa o estado do reducer de meals após o dispatch da action GET_MEALS', () => {
    const meals = [{ idMeal: '1' }, { idMeal: '2' }];
    expect(mealsReducer(undefined, getMeals(meals))).toEqual({ meals });
  });

  test('Testa o comportamento do estado a partir de uma action desconhecida', () => {
    const initialState = { meals: [] };

    const action = { type: 'UNKNOWN_ACTION_TYPE', payload: {} } as any;
    const newState = mealsReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
