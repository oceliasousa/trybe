import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { RecipeKeysType, RecipeType } from '../types';
import Recommendations from '../Components/Recommendations';
import {
  addToFavorites,
  getDoneRecipes,
  getInProgressRecipes,
  isFavorited,
} from '../services/localstorage';

function RecipeDetails() {
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState<RecipeType | null>(null);
  const [recommendations, setRecommendations] = useState<RecipeType[]>([]);
  const mealType : 'meals' | 'drinks' = pathname.includes('/meals/') ? 'meals' : 'drinks';
  const recommendationType : 'meals' | 'drinks' = pathname
    .includes('/meals/') ? 'drinks' : 'meals';
  const [isFavoritedRecipe, setIsFavoritedRecipe] = useState<boolean>(false);

  useEffect(() => {
    const url = mealType === 'meals'
      ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
      : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    fetch(url)
      .then((response) => response.json()
        .then((jsonResponse) => { setRecipe(jsonResponse[mealType][0]); }));
  }, [recipeId, mealType]);

  useEffect(() => {
    if (!recipe) return;

    const url = recommendationType === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

    fetch(url)
      .then((response) => response.json()
        .then((jsonResponse) => {
          setRecommendations(jsonResponse[recommendationType].slice(0, 6));
        }));
  }, [recipe, recommendationType]);

  useEffect(() => {
    if (!recipe) return;
    setIsFavoritedRecipe(isFavorited(recipe));
  }, [recipe]);

  if (!recipe) {
    return <span>Loading</span>;
  }

  let recipeName = '';
  if ('strMeal' in recipe) {
    recipeName = recipe.strMeal;
  } else if ('strDrink' in recipe) {
    recipeName = recipe.strDrink;
  }

  let recipeThumb = '';
  if ('strMealThumb' in recipe) {
    recipeThumb = recipe.strMealThumb;
  } else if ('strDrinkThumb' in recipe) {
    recipeThumb = recipe.strDrinkThumb;
  }

  const showStartRecipeButton = () => {
    const doneRecipes = getDoneRecipes();

    const currentRecipe = doneRecipes.find((recipes) => recipes.id === recipeId);

    return !currentRecipe;
  };

  const inProgressRecipes = getInProgressRecipes();

  const getStartRecipeButtonText = () => {
    if ('idMeal' in recipe && recipe.idMeal in inProgressRecipes.meals) {
      return 'Continue Recipe';
    }
    if ('idDrink' in recipe && recipe.idDrink in inProgressRecipes.drinks) {
      return 'Continue Recipe';
    }

    return 'Start Recipe';
  };

  const shareRecipe = () => {
    navigator.clipboard.writeText(window.location.href);
    document.getElementById('link_copied')?.classList.remove('d-none');
  };

  const handleFavoriteRecipe = () => {
    addToFavorites(recipe);
    setIsFavoritedRecipe(isFavorited(recipe));
  };

  return (
    <div className="pb-5">
      <h1>Recipe Details</h1>
      <h2 data-testid="recipe-title">
        { recipeName }
      </h2>
      <h3 data-testid="recipe-category">
        { recipe.strCategory }
        {' '}
        { 'strAlcoholic' in recipe && recipe.strAlcoholic }
      </h3>
      {(Object.keys(recipe).filter((key) => key
        .startsWith('strIngredient')) as RecipeKeysType[])
        .map((ingredientKey: RecipeKeysType, index) => {
          if (recipe[ingredientKey]) {
            return (
              <div
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <span>
                  {recipe[ingredientKey]}
                  {' '}
                  {recipe[ingredientKey
                    .replace('Ingredient', 'Measure') as RecipeKeysType]}
                </span>
              </div>
            );
          }
          return null;
        })}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <img
        data-testid="recipe-photo"
        src={ recipeThumb }
        alt={ recipeName }
      />
      {mealType === 'meals' && 'strYoutube' in recipe
        && <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ recipe.strYoutube }
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; web-share"
          allowFullScreen
        />}
      <Recommendations recipes={ recommendations } />
      {showStartRecipeButton() && (
        <Link to={ `/${mealType}/${recipeId}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            className="btn btn-secondary fixed-bottom w-25"
          >
            { getStartRecipeButtonText() }
          </button>
        </Link>
      )}
      <button data-testid="share-btn" onClick={ shareRecipe }>
        <img src="/src/images/shareIcon.svg" alt="Share recipe" />
      </button>
      <button onClick={ handleFavoriteRecipe }>
        <img
          data-testid="favorite-btn"
          src={ isFavoritedRecipe
            ? '/src/images/blackHeartIcon.svg' : '/src/images/whiteHeartIcon.svg' }
          alt="Favorite recipe"
        />
      </button>
      <span id="link_copied" className="d-none">Link copied!</span>
    </div>
  );
}

export default RecipeDetails;
