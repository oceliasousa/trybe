import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ReduxState } from '../types';
import Button from './Button';
import Input from './Input';
import { validateApi, validateApiDrinks } from '../services/api';
import { getDrinks, getMeals } from '../redux/actions/actionMealsAndDrinks';

function SearchBar() {
  const [searchBarForm, setSearchBarForm] = useState({ search: '', recipes: '' });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch:Dispatch = useDispatch();
  const meals = useSelector((state: ReduxState) => state.meals.meals);
  const drinks = useSelector((state: ReduxState) => state.drinks.drinks);
  const { search, recipes } = searchBarForm;

  const handleSearchFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearchBarForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const navigateToId = () => {
    if (!meals || !drinks) {
      return window.alert("Sorry, we haven't found any recipes for these filters");
    }

    if (meals.length === 1) {
      const { idMeal } = meals[0];
      navigate(`/meals/${idMeal}`);
    }

    if (drinks.length === 1) {
      const { idDrink } = drinks[0];
      navigate(`/drinks/${idDrink}`);
    }
  };

  const handleSearchFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pathname.includes('/meals')) {
      const response = await validateApi(recipes, search);
      dispatch(getMeals(response));
    }

    if (pathname.includes('/drinks')) {
      const responseDrinks = await validateApiDrinks(recipes, search);
      dispatch(getDrinks(responseDrinks));
    }
  };

  useEffect(() => {
    navigateToId();
  }, [meals, drinks]);

  return (

    <div>
      <form onSubmit={ handleSearchFormSubmit }>
        <Input
          data-testid="search-input"
          type="text"
          name="search"
          id="search"
          value={ searchBarForm.search }
          onChange={ handleSearchFormChange }
        />
        <Input
          data-testid="ingredient-search-radio"
          labelText="Ingrediente "
          type="radio"
          name="recipes"
          id="ingredient"
          value="ingredient"
          onChange={ handleSearchFormChange }
        />
        <Input
          data-testid="name-search-radio"
          labelText="Nome "
          type="radio"
          name="recipes"
          id="name"
          value="name"
          onChange={ handleSearchFormChange }
        />
        <Input
          data-testid="first-letter-search-radio"
          labelText="Primeira Letra "
          type="radio"
          name="recipes"
          id="firstLetter"
          value="firstLetter"
          onChange={ handleSearchFormChange }
        />

        <Button
          data-testid="exec-search-btn"
          type="submit"
        >
          Buscar
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
