import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import { useLocalStorage } from '../hooks/useLocalStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { getDrinksById, getRecipesById } from '../services/api';
import { DrinksType, Ingredients, MealsType } from '../types';
import { favoritesOrNot, ingredientsRecipes, teste } from '../utils';

function RecipeInProgress() {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const [value, setStoredValue] = useLocalStorage('inProgressRecipes', {
    drinks: [], meals: [] });
  const [recipe, setRecipe] = useState<MealsType | DrinksType>({});
  const [ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [route, id] = pathname.split('/').filter((element) => element !== '');
  const [isFavorite, setIsFavorite] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const favoriteRecipe = [{
    id,
    type: route.replace('s', ''),
    nationality: recipe?.strArea || '',
    category: recipe?.strCategory,
    alcoholicOrNot: recipe?.strAlcoholic || '',
    name: recipe?.strDrink || recipe?.strMeal,
    image: recipe?.strDrinkThumb || recipe?.strMealThumb,
  }];

  const doneRecipes = {
    id,
    type: route.replace('s', ''),
    nationality: recipe?.strArea || '',
    category: recipe?.strCategory,
    alcoholicOrNot: recipe?.strAlcoholic || '',
    name: recipe?.strDrink || recipe?.strMeal,
    image: recipe?.strDrinkThumb || recipe?.strMealThumb,
    doneDate: new Date(),
    tags: recipe?.strTags?.split(',') || [],
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      let result;

      if (route === 'meals') {
        result = await getRecipesById(id);
      } else {
        result = await getDrinksById(id);
      }
      setRecipe(result[0]);
    };
    teste(setIsFavorite, id);
    fetchRecipe();
    ingredientsRecipes(recipe, setIngredients);
    storageIngredients();
  }, [pathname, route, id, recipe]);

  const storageIngredients = () => {
    if (value[route][id]) {
      setChecked(value[route][id]);
    }
  };

  const checkAllIngredients = (filtered: string[]) => {
    const allChecked = filtered.length === ingredients.length;

    setIsDisabled(!allChecked);
  };

  const handleCheckbox = (ingredientName: string) => {
    if (checked.includes(ingredientName)) {
      const filtered = checked.filter((ingredient) => ingredient !== ingredientName);
      setChecked(filtered);
      setStoredValue({
        ...value,
        [route]: {
          ...value[route],
          [id]: filtered,
        },
      });
      checkAllIngredients(filtered);
    } else {
      const withThis = [...checked, ingredientName];
      setChecked(withThis);
      setStoredValue({
        ...value,
        [route]: {
          ...value[route],
          [id]: withThis,
        },
      });
      checkAllIngredients(withThis);
    }
  };

  const handleCopyButton = () => {
    navigator.clipboard.writeText(`http://localhost:3000${pathname.replace('/in-progress', '')}`);
    setLinkCopied((prevState) => !prevState);
  };

  const handleFavoriteButton = () => {
    favoritesOrNot(id, setIsFavorite, favoriteRecipe);
  };

  const handleFinishRecipe = () => {
    const verifyDoneRecipes = localStorage.getItem('doneRecipes');
    if (!verifyDoneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipes]));
    } else {
      const newDoneRecipes = JSON.parse(verifyDoneRecipes);
      newDoneRecipes.push(doneRecipes);
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
    navigate('/done-recipes');
  };

  return (
    <>
      <h1 data-testid="recipe-title">
        { `Recipe In Progress - ${recipe.strMeal ?? recipe.strDrink}`}
      </h1>
      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb ?? recipe.strDrinkThumb }
        alt="recipe"
      />
      <Button data-testid="share-btn" onClick={ handleCopyButton }>
        Share
      </Button>
      <Button onClick={ handleFavoriteButton }>
        Favorite
        <img
          data-testid="favorite-btn"
          src={ isFavorite
            ? blackHeartIcon : whiteHeartIcon }
          alt="Icone de Favorito"
        />
      </Button>
      {linkCopied && <p>Link copied!</p>}
      <h2 data-testid="recipe-category">{`Recipe Category - ${route}`}</h2>
      {ingredients.map((ingredient: any, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          style={ checked.includes(ingredient.ingredient)
            ? { textDecoration: 'line-through solid rgb(0, 0, 0)' } : {} }
        >
          {`${ingredient.ingredient} - ${ingredient.measurement}`}
          <Input
            type="checkbox"
            onChange={ () => handleCheckbox(ingredient.ingredient) }
            checked={ checked.includes(ingredient.ingredient) }
          />
        </li>
      ))}
      <h3 data-testid="instructions">
        {`Instructions:
      ${recipe.strInstructions}`}
      </h3>
      <Button
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
        onClick={ handleFinishRecipe }
        style={ { position: 'fixed', bottom: '0', left: '50%' } }
      >
        Finish Recipe
      </Button>
    </>
  );
}

export default RecipeInProgress;
